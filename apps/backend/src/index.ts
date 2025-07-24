import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { getConfig } from '@/config/env';
import { createLogger } from '@/utils/logger';
import { checkDatabaseConnection, getDatabaseStats, runMigrations } from '@/db/connection';

const app = new Hono();
const log = createLogger('server');

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
);

// Health check endpoint
app.get('/health', c => {
  const config = getConfig();
  const dbConnected = checkDatabaseConnection();
  
  return c.json({
    status: dbConnected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    environment: config.nodeEnv,
    database: {
      connected: dbConnected,
      stats: dbConnected ? getDatabaseStats() : null,
    },
  });
});

// Database status endpoint
app.get('/db/status', c => {
  const dbConnected = checkDatabaseConnection();
  const stats = dbConnected ? getDatabaseStats() : null;
  
  return c.json({
    connected: dbConnected,
    stats,
    timestamp: new Date().toISOString(),
  });
});

// Basic API info
app.get('/', c => {
  return c.json({
    name: 'Tinker Backend API',
    description: 'Modern Hono.js backend for invoice approval system',
    version: '0.1.0',
    docs: '/docs',
    health: '/health',
  });
});

// 404 handler
app.notFound(c => {
  return c.json(
    {
      error: 'Not Found',
      message: 'The requested resource was not found',
      path: c.req.path,
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  log.error('Unhandled error:', err);
  return c.json(
    {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    },
    500
  );
});

// Initialize database and start server
async function startServer() {
  const config = getConfig();
  const port = config.port;

  log.info(`Starting Tinker Backend API on port ${port}`);
  log.info(`Environment: ${config.nodeEnv}`);

  // Initialize database
  try {
    log.info('Initializing database...');
    await runMigrations();
    
    const dbConnected = checkDatabaseConnection();
    if (dbConnected) {
      const stats = getDatabaseStats();
      log.info('Database connected successfully');
      log.info(`Database stats: ${JSON.stringify(stats)}`);
    } else {
      log.error('Database connection failed');
    }
  } catch (error) {
    log.error('Database initialization failed:', error);
    process.exit(1);
  }

  // Start server
  serve(
    {
      fetch: app.fetch,
      port,
    },
    info => {
      log.info(`🔥 Server is running on http://localhost:${info.port}`);
      log.info(`🗄️ Database: ${checkDatabaseConnection() ? 'Connected' : 'Disconnected'}`);
    }
  );
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(error => {
    log.error('Failed to start server:', error);
    process.exit(1);
  });
}

export default app;
