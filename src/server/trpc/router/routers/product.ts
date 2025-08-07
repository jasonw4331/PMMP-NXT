import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { prisma } from '@/server/utils/prisma';
import { Octokit } from '@octokit/rest';

const t = initTRPC.context<Context>().create();

export const ProductFilterInput = z.object({
  query: z.string().optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  limit: z.number().min(1).max(50).default(20),
  cursor: z.string().nullish(),
});

export const ProductSummary = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  ratingAvg: z.number(),
});

export const ProductDetail = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  ratingAvg: z.number(),
  versions: z.array(
    z.object({
      id: z.string(),
      versionTag: z.string(),
      changelog: z.string(),
      fileUrl: z.string(),
      isReleased: z.boolean(),
      releaseDate: z.date().nullable(),
    })
  ),
});

export const ProductCreateInput = z.object({
  slug: z.string().min(3),
  title: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().optional(),
  githubRepo: z.string().optional(),
});

export const ProductEditInput = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  isPublished: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
});

export const ImportFromGitHubInput = z.object({
  owner: z.string(),
  repo: z.string(),
  productId: z.string(),
});

export const productRouter = t.router({
  list: t.procedure
    .input(ProductFilterInput)
    .output(z.object({ items: z.array(ProductSummary), nextCursor: z.string().nullish() }))
    .query(async ({ input }) => {
      const items = await prisma.product.findMany({
        where: {
          AND: [
            input.categoryId ? { categoryId: input.categoryId } : {},
            input.query
              ? {
                  OR: [
                    { title: { contains: input.query, mode: 'insensitive' } },
                    { description: { contains: input.query, mode: 'insensitive' } },
                  ],
                }
              : {},
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          ratingAvg: true,
        },
      });
      let nextCursor: string | null = null;
      if (items.length > input.limit) {
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }
      return { items, nextCursor };
    }),

  getBySlug: t.procedure
    .input(z.object({ slug: z.string() }))
    .output(ProductDetail)
    .query(async ({ input }) => {
      const prod = await prisma.product.findUnique({
        where: { slug: input.slug },
        include: {
          versions: {
            where: { isReleased: true },
            orderBy: { releaseDate: 'desc' },
            select: {
              id: true,
              versionTag: true,
              changelog: true,
              fileUrl: true,
              isReleased: true,
              releaseDate: true,
            },
          },
        },
      });
      if (!prod) throw new Error('Not found');
      return {
        id: prod.id,
        slug: prod.slug,
        title: prod.title,
        description: prod.description,
        ratingAvg: prod.ratingAvg,
        versions: prod.versions.map((v) => ({
          id: v.id,
          versionTag: v.versionTag,
          changelog: v.changelog,
          fileUrl: v.fileUrl,
          isReleased: v.isReleased,
          releaseDate: v.releaseDate,
        })),
      };
    }),

  create: t.procedure
    .input(ProductCreateInput)
    .output(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      const created = await prisma.product.create({
        data: {
          slug: input.slug,
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          githubRepo: input.githubRepo,
          developerId: ctx.session.user.id,
        },
        select: { id: true },
      });
      return created;
    }),

  edit: t.procedure
    .input(ProductEditInput)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.product.update({
        where: { id: input.id },
        data: {
          title: input.title ?? undefined,
          description: input.description ?? undefined,
          isPublished: input.isPublished ?? undefined,
          categoryId: input.categoryId === undefined ? undefined : input.categoryId,
        },
      });
      return { success: true };
    }),

  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.product.delete({ where: { id: input.id } });
      return { success: true };
    }),

  importFromGitHub: t.procedure
    .input(ImportFromGitHubInput)
    .output(z.object({ imported: z.boolean(), releaseCount: z.number() }))
    .mutation(async ({ input }) => {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN, // optional; document secure storage
      });
      const releases = await octokit.repos.listReleases({
        owner: input.owner,
        repo: input.repo,
        per_page: 10,
      });
      let count = 0;
      for (const r of releases.data) {
        const tag = r.tag_name ?? 'unknown';
        const asset = r.assets[0];
        await prisma.productVersion.upsert({
          where: { productId_versionTag: { productId: input.productId, versionTag: tag } },
          update: {},
          create: {
            productId: input.productId,
            versionTag: tag,
            changelog: r.body ?? '',
            fileUrl: asset?.browser_download_url ?? '',
            fileSizeBytes: asset?.size ?? 0,
            isReleased: true,
            releaseDate: r.published_at ? new Date(r.published_at) : new Date(),
            source: 'GITHUB',
          },
        });
        count++;
      }
      return { imported: true, releaseCount: count };
    }),
});