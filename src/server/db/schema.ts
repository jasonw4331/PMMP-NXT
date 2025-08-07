import { pgTable, text, timestamp, boolean, integer, real, pgEnum, uniqueIndex, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userRoleEnum = pgEnum('UserRole', ['VISITOR', 'USER', 'DEVELOPER', 'ADMIN']);
export const productVersionSourceEnum = pgEnum('ProductVersionSource', ['MANUAL', 'GITHUB']);
export const challengeTypeEnum = pgEnum('ChallengeType', ['REGISTRATION', 'AUTHENTICATION']);
export const reviewStatusEnum = pgEnum('ReviewStatus', ['PENDING', 'APPROVED', 'REJECTED']);

export const users = pgTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').notNull().default('USER'),
  githubId: text('githubId').unique(),
  githubAccessToken: text('githubAccessToken'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
});

export const authenticators = pgTable('Authenticator', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => users.id),
  credentialID: text('credentialID').notNull().unique(),
  publicKey: text('publicKey').notNull(),
  counter: integer('counter').notNull().default(0),
  transports: text('transports'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export const categories = pgTable('Category', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const products = pgTable('Product', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  developerId: text('developerId').notNull().references(() => users.id),
  categoryId: text('categoryId').references(() => categories.id),
  isPublished: boolean('isPublished').notNull().default(false),
  ratingAvg: real('ratingAvg').notNull().default(0),
  githubRepo: text('githubRepo'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().defaultNow(),
});

export const productVersions = pgTable('ProductVersion', {
  id: text('id').primaryKey(),
  productId: text('productId').notNull().references(() => products.id),
  versionTag: text('versionTag').notNull(),
  changelog: text('changelog').notNull(),
  fileUrl: text('fileUrl').notNull(),
  fileSizeBytes: integer('fileSizeBytes').notNull(),
  isReleased: boolean('isReleased').notNull().default(false),
  releaseDate: timestamp('releaseDate', { mode: 'date' }),
  source: productVersionSourceEnum('source').notNull().default('MANUAL'),
}, (table) => ({
  productVersionUnique: uniqueIndex('productId_versionTag').on(table.productId, table.versionTag),
}));

export const productsRelations = relations(products, ({ many, one }) => ({
  versions: many(productVersions),
  developer: one(users, { fields: [products.developerId], references: [users.id] }),
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
}));

export const productVersionsRelations = relations(productVersions, ({ one }) => ({
  product: one(products, { fields: [productVersions.productId], references: [products.id] }),
}));

export const reviews = pgTable('Review', {
  id: text('id').primaryKey(),
  productId: text('productId').notNull().references(() => products.id),
  userId: text('userId').notNull().references(() => users.id),
  rating: integer('rating').notNull(),
  content: text('content').notNull(),
  status: reviewStatusEnum('status').notNull().default('PENDING'),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export const tags = pgTable('Tag', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const productTags = pgTable('ProductTag', {
  productId: text('productId').notNull().references(() => products.id),
  tagId: text('tagId').notNull().references(() => tags.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.productId, table.tagId] }),
}));

export const pushSubscriptions = pgTable('PushSubscription', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => users.id),
  endpoint: text('endpoint').notNull().unique(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export const follows = pgTable('Follow', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => users.id),
  developerId: text('developerId').notNull().references(() => users.id),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

export const persistedChallenges = pgTable('PersistedChallenge', {
  id: text('id').primaryKey(),
  userId: text('userId'),
  challenge: text('challenge').notNull().unique(),
  type: challengeTypeEnum('type').notNull(),
  expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
});
