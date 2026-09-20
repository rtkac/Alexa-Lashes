import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as allowedEmailSchema from './schema/allowed-email-schema';
import * as authSchema from './schema/auth-schema';
import * as reviewsSchema from './schema/reviews-schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, {
  schema: { ...authSchema, ...reviewsSchema, ...allowedEmailSchema },
});
