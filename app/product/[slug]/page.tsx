import { prisma } from '@/server/utils/prisma';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const prod = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      versions: { where: { isReleased: true }, orderBy: { releaseDate: 'desc' } },
    },
  });
  if (!prod) return <div className="p-6">Not found</div>;
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-3xl font-bold">{prod.title}</h1>
      <p>{prod.description}</p>
      <h2 className="text-xl font-semibold">Releases</h2>
      <ul className="space-y-2">
        {prod.versions.map((v) => (
          <li key={v.id} className="border rounded p-3">
            <div className="font-medium">{v.versionTag}</div>
            <div className="text-sm opacity-80">{v.changelog}</div>
            <a className="text-blue-600 underline" href={v.fileUrl}>
              Download
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}