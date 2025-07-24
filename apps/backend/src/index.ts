import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { config } from '@/config/env';
import { createLogger } from '@/utils/logger';

const app = new Hono();
const log = createLogger('server');

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    environment: config.nodeEnv,
  });
});

// Basic API info
app.get('/', (c) => {
  return c.json({
    name: 'Tinker Backend API',
    description: 'Modern Hono.js backend for invoice approval system',
    version: '0.1.0',
    docs: '/docs',
    health: '/health',
  });
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested resource was not found',
    path: c.req.path,
  }, 404);
});

// Error handler
app.onError((err, c) => {
  log.error('Unhandled error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  }, 500);
});

const port = config.port;

log.info(`Starting Tinker Backend API on port ${port}`);
log.info(`Environment: ${config.nodeEnv}`);

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  log.info(`🔥 Server is running on http://localhost:${info.port}`);
});

export default app;
