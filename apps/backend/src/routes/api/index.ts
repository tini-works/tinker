import { Hono } from 'hono';
import usersRoutes from './users';

const apiRoutes = new Hono();

// Mount API routes
apiRoutes.route('/users', usersRoutes);

// API info endpoint
apiRoutes.get('/', (c) => {
  return c.json({
    name: 'Tinker API',
    version: '1.0.0',
    description: 'Invoice approval system API',
    endpoints: {
      users: '/api/users',
      auth: '/auth',
      health: '/health',
    },
    documentation: '/docs',
  });
});

export default apiRoutes;

