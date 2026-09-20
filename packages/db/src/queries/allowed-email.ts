import { eq, and } from 'drizzle-orm';

import { db } from '..';
import { allowedEmail } from '../schema/allowed-email-schema';

export async function isEmailAllowed(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const result = await db
    .select({ id: allowedEmail.id })
    .from(allowedEmail)
    .where(and(eq(allowedEmail.email, normalizedEmail), eq(allowedEmail.enabled, true)))
    .limit(1);

  return result.length > 0;
}
