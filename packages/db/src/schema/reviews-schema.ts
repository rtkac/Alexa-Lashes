import { boolean, integer, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';

import { locales } from '../locales';

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),

  name: text('name').notNull(),

  rating: integer('rating').notNull(),

  url: text('url'),

  enabled: boolean('enabled').notNull().default(true),

  displayOrder: integer('display_order').notNull().default(0),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const reviewTranslations = pgTable(
  'review_translations',
  {
    id: text('id').primaryKey(),

    reviewId: text('review_id')
      .notNull()
      .references(() => reviews.id, { onDelete: 'cascade' }),

    locale: text('locale', { enum: locales }).notNull(),

    description: text('description').notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique('review_translation_review_locale_unique').on(table.reviewId, table.locale)],
);
