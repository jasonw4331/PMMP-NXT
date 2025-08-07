import Link from 'next/link';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/server/trpc/router';

type RouterOutput = inferRouterOutputs<AppRouter>;
export type ProductSummary = RouterOutput['product']['list']['items'][number];

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link href={`/product/${product.slug}`} className="block border rounded p-4 hover:shadow">
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm opacity-80 line-clamp-3">{product.description}</p>
      <div className="text-xs mt-2">Rating: {product.ratingAvg.toFixed(1)}</div>
    </Link>
  );
}