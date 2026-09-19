import { db } from '@alexa-lashes/db';
import { isEmailAllowed } from '@alexa-lashes/db/queries/allowed-email';
import * as schema from '@alexa-lashes/db/schema/auth-schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  user: {
    validateUserInfo: async ({ user, source }) => {
      if (source.oauth?.providerId !== 'google') {
        return;
      }

      const email = user.email?.trim().toLowerCase();

      if (!email) {
        return {
          error: 'email_not_allowed',
          errorDescription: 'A valid email address is required.',
        };
      }

      const allowed = await isEmailAllowed(email);

      if (!allowed) {
        return {
          error: 'email_not_allowed',
          errorDescription: 'This Google account is not authorized to sign in.',
        };
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          image: profile.picture,
        };
      },
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [tanstackStartCookies()],
});
