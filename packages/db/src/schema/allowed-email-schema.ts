import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const allowedEmail = pgTable('allowed_email', {
  id: text('id').primaryKey(),

  email: text('email').notNull().unique(),

  enabled: boolean('enabled').notNull().default(true),

  createdAt: timestamp('created_at').notNull().defaultNow(),

  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
