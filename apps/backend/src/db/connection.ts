import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { logger } from '../utils/logger';

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL || './data/tinker.db';

// Create SQLite database instance
const sqlite = new Database(DATABASE_URL);

// Enable WAL mode for better performance
sqlite.pragma('journal_mode = WAL');

// Enable foreign key constraints
sqlite.pragma('foreign_keys = ON');

// Create Drizzle database instance with schema
export const db = drizzle(sqlite, { schema });

// Migration function
export async function runMigrations() {
  try {
    logger.info('Running database migrations...');
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/db/migrations'),
    });
    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Error running migrations:', error);
    throw error;
  }
}

// Connection health check
export function checkDatabaseConnection(): boolean {
  try {
    const result = sqlite.prepare('SELECT 1 as test').get() as
      | { test: number }
      | undefined;
    return Boolean(result && result.test === 1);
  } catch (error) {
    logger.error('Database connection check failed:', error);
    return false;
  }
}

// Graceful shutdown
export function closeDatabaseConnection() {
  try {
    sqlite.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
}

// SQLite instance is available internally but not exported to avoid type issues

// Database statistics
export function getDatabaseStats() {
  try {
    const stats = {
      users: sqlite.prepare('SELECT COUNT(*) as count FROM user').get() as {
        count: number;
      },
      invoices: sqlite
        .prepare('SELECT COUNT(*) as count FROM invoices')
        .get() as { count: number },
      paymentRequests: sqlite
        .prepare('SELECT COUNT(*) as count FROM payment_requests')
        .get() as { count: number },
      approvalHistory: sqlite
        .prepare('SELECT COUNT(*) as count FROM approval_history')
        .get() as { count: number },
      businessProcessLogs: sqlite
        .prepare('SELECT COUNT(*) as count FROM business_process_logs')
        .get() as { count: number },
    };

    return {
      users: stats.users.count,
      invoices: stats.invoices.count,
      paymentRequests: stats.paymentRequests.count,
      approvalHistory: stats.approvalHistory.count,
      businessProcessLogs: stats.businessProcessLogs.count,
    };
  } catch (error) {
    logger.error('Error getting database stats:', error);
    return null;
  }
}
