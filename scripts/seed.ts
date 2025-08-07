import { db } from '@/server/db';
import { users, products, productVersions } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const devEmail = 'dev@example.com';
  const [existing] = await db.select().from(users).where(eq(users.email, devEmail));
  const devId = existing?.id ?? `u_${Math.random().toString(36).slice(2)}`;
  if (!existing) {
    await db.insert(users).values({ id: devId, email: devEmail, name: 'Sample Dev', role: 'DEVELOPER' });
  }

  const slug = 'sample-app';
  const [prodExisting] = await db.select().from(products).where(eq(products.slug, slug));
  const productId = prodExisting?.id ?? `p_${Math.random().toString(36).slice(2)}`;
  if (!prodExisting) {
    await db.insert(products).values({
      id: productId,
      slug,
      title: 'Sample App',
      description: 'An example free software app',
      developerId: devId,
      isPublished: true,
    });
  }

  await db.insert(productVersions).values({
    id: `v_${Math.random().toString(36).slice(2)}`,
    productId,
    versionTag: 'v1.0.0',
    changelog: 'Initial release',
    fileUrl: 'https://example.com/sample-app-v1.zip',
    fileSizeBytes: 1024,
    isReleased: true,
    releaseDate: new Date(),
    source: 'MANUAL',
  });

  console.log('Seeded data');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});