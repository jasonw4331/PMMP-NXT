import { PrismaClient, UserRole, ProductVersionSource } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dev = await prisma.user.upsert({
    where: { email: 'dev@example.com' },
    update: {},
    create: {
      email: 'dev@example.com',
      name: 'Sample Dev',
      role: UserRole.DEVELOPER,
    },
  });

  const prod = await prisma.product.upsert({
    where: { slug: 'sample-app' },
    update: {},
    create: {
      slug: 'sample-app',
      title: 'Sample App',
      description: 'An example free software app',
      developerId: dev.id,
      isPublished: true,
    },
  });

  await prisma.productVersion.create({
    data: {
      productId: prod.id,
      versionTag: 'v1.0.0',
      changelog: 'Initial release',
      fileUrl: 'https://example.com/sample-app-v1.zip',
      fileSizeBytes: 1024,
      isReleased: true,
      releaseDate: new Date(),
      source: ProductVersionSource.MANUAL,
    },
  });

  console.log('Seeded data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });