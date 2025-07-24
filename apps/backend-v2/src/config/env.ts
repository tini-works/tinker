import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

const envSchema = z.object({
  // Server
  PORT: z.string().default('3001').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database
  DATABASE_URL: z.string().default('./data/app.db'),
  
  // Authentication
  BETTER_AUTH_SECRET: z.string().min(32, 'Auth secret must be at least 32 characters'),
  BETTER_AUTH_URL: z.string().url().default('http://localhost:3001'),
  
  // Google OAuth (optional)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  
  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('pretty'),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Invalid environment variables:');
  parseResult.error.issues.forEach(issue => {
    console.error(`  ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const config = {
  port: parseResult.data.PORT,
  nodeEnv: parseResult.data.NODE_ENV,
  database: {
    url: parseResult.data.DATABASE_URL,
  },
  auth: {
    secret: parseResult.data.BETTER_AUTH_SECRET,
    url: parseResult.data.BETTER_AUTH_URL,
    google: {
      clientId: parseResult.data.GOOGLE_CLIENT_ID,
      clientSecret: parseResult.data.GOOGLE_CLIENT_SECRET,
    },
  },
  logging: {
    level: parseResult.data.LOG_LEVEL,
    format: parseResult.data.LOG_FORMAT,
  },
} as const;

export type Config = typeof config;

