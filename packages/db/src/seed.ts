import { allowedEmail } from './schema/allowed-email-schema';

import { db } from '.';

const email = ''; // add your email here

await db
  .insert(allowedEmail)
  .values({
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    enabled: true,
  })
  .onConflictDoUpdate({
    target: allowedEmail.email,
    set: {
      enabled: true,
      updatedAt: new Date(),
    },
  });

console.log(`Seeded allowed email: ${email}`);
