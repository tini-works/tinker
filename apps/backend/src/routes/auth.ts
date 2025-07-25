import { Hono } from 'hono';
import { auth } from '../auth/config';
import { authMiddleware, getCurrentUser } from '../middleware/auth';
import { logger } from '../utils/logger';

const authRoutes = new Hono();

// Apply auth middleware to all routes
authRoutes.use('*', authMiddleware);

// Mount better-auth API routes
authRoutes.mount('/api/auth', auth.handler);

// Get current user info
authRoutes.get('/me', async c => {
  const user = getCurrentUser(c);

  if (!user) {
    return c.json({ user: null, authenticated: false });
  }

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    authenticated: true,
  });
});

// Sign out endpoint
authRoutes.post('/signout', async c => {
  try {
    await auth.api.signOut({
      headers: c.req.raw.headers,
    });

    logger.info('User signed out successfully');
    return c.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    logger.error('Sign out error:', error);
    return c.json(
      {
        error: 'Failed to sign out',
        code: 'PP003', // Business process error code for sign out failure
      },
      500
    );
  }
});

// Health check for auth system
authRoutes.get('/health', async c => {
  try {
    // Test database connection
    const user = getCurrentUser(c);

    return c.json({
      status: 'ok',
      authenticated: !!user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Auth health check failed:', error);
    return c.json(
      {
        status: 'error',
        error: 'Auth system health check failed',
        code: 'PP004',
      },
      500
    );
  }
});

export default authRoutes;
