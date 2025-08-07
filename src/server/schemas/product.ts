import { z } from 'zod';

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