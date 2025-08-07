'use client';
import { trpc } from '@/lib/trpc';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { data } = trpc.product.list.useQuery({ limit: 20 });
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Latest Software</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.items.map((p) => (
          <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </main>
  );
}