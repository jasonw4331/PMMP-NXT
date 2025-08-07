import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { db } from '@/server/db';
import { Octokit } from '@octokit/rest';
import { products, productVersions } from '@/server/db/schema';

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
      const items = await db.query.products.findMany({
        where: (t, { and, eq }) => and(
          input.categoryId ? eq(t.categoryId, input.categoryId) : undefined,
        ),
        columns: { id: true, slug: true, title: true, description: true, ratingAvg: true },
        limit: input.limit + 1,
        offset: 0,
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
      const prod = await db.query.products.findFirst({
        where: (t, { eq }) => eq(t.slug, input.slug),
        with: {
          versions: {
            where: (t, { eq }) => eq(t.isReleased, true),
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
          releaseDate: v.releaseDate ?? null,
        })),
      };
    }),

  create: t.procedure
    .input(ProductCreateInput)
    .output(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      const id = `p_${Math.random().toString(36).slice(2)}`;
      await db.insert(products).values({
        id,
        slug: input.slug,
        title: input.title,
        description: input.description,
        categoryId: input.categoryId,
        githubRepo: input.githubRepo,
        developerId: ctx.session.user.id,
      });
      return { id };
    }),

  edit: t.procedure
    .input(ProductEditInput)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await db.update(products)
        .set({
          title: input.title ?? undefined,
          description: input.description ?? undefined,
          isPublished: input.isPublished ?? undefined,
          categoryId: input.categoryId === undefined ? undefined : input.categoryId ?? null,
        })
        .where((t, { eq }) => eq(t.id, input.id));
      return { success: true };
    }),

  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await db.delete(products).where((t, { eq }) => eq(t.id, input.id));
      return { success: true };
    }),

  importFromGitHub: t.procedure
    .input(ImportFromGitHubInput)
    .output(z.object({ imported: z.boolean(), releaseCount: z.number() }))
    .mutation(async ({ input }) => {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
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
        const exists = await db.query.productVersions.findFirst({
          where: (t, { and, eq }) => and(eq(t.productId, input.productId), eq(t.versionTag, tag)),
        });
        if (!exists) {
          await db.insert(productVersions).values({
            id: `v_${Math.random().toString(36).slice(2)}`,
            productId: input.productId,
            versionTag: tag,
            changelog: r.body ?? '',
            fileUrl: asset?.browser_download_url ?? '',
            fileSizeBytes: asset?.size ?? 0,
            isReleased: true,
            releaseDate: r.published_at ? new Date(r.published_at) : new Date(),
            source: 'GITHUB',
          });
          count++;
        }
      }
      return { imported: true, releaseCount: count };
    }),
});