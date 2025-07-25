import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db/connection';
import { getConfig } from '../config/env';
import { logger } from '../utils/logger';

const config = getConfig();

export const auth: any = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
  },
  socialProviders: {
    google:
      config.auth.google.clientId && config.auth.google.clientSecret
        ? {
            clientId: config.auth.google.clientId,
            clientSecret: config.auth.google.clientSecret,
          }
        : undefined,
  },
  secret: config.auth.secret,
  baseURL: config.auth.url,
  logger: {
    level: config.logging.level,
    disabled: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'invoice_processor',
        required: false,
      },
    },
  },
  callbacks: {
    async signUp({ user }: { user: any }) {
      logger.info(`New user signed up: ${user.email}`);
      return {
        user: {
          ...user,
          role: 'invoice_processor', // Default role
        },
      };
    },
    async signIn({ user }: { user: any }) {
      logger.info(`User signed in: ${user.email}`);
      return { user };
    },
  },
});

export type Session = any;
export type User = any;
