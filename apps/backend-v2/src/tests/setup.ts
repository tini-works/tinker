import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = ':memory:';
  process.env.BETTER_AUTH_SECRET = 'test-secret-key-for-testing-only-32-chars';
  process.env.LOG_LEVEL = 'error'; // Reduce noise in tests
});

afterAll(async () => {
  // Cleanup after tests
});

