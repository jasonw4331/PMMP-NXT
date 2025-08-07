import { z } from 'zod';

export const ReviewCreateInput = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1),
});