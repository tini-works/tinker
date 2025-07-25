import { Context, Next } from 'hono';
import { auth } from '../auth/config';
import { logger } from '../utils/logger';

export interface AuthContext {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    emailVerified: boolean;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
  } | null;
}

/**
 * Authentication middleware that verifies the session and adds user info to context
 */
export async function authMiddleware(c: Context, next: Next) {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    // Add auth info to context
    c.set('auth', {
      user: session?.user || null,
      session: session?.session || null,
    } as AuthContext);

    await next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    c.set('auth', { user: null, session: null } as AuthContext);
    await next();
  }
}

/**
 * Middleware that requires authentication
 */
export async function requireAuth(c: Context, next: Next) {
  const auth = c.get('auth') as AuthContext;

  if (!auth?.user || !auth?.session) {
    return c.json(
      {
        error: 'Authentication required',
        code: 'PP001', // Business process error code for authentication
      },
      401
    );
  }

  return next();
}

/**
 * Middleware that requires specific roles
 */
export function requireRole(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;

    if (!auth?.user) {
      return c.json(
        {
          error: 'Authentication required',
          code: 'PP001',
        },
        401
      );
    }

    if (!roles.includes(auth.user.role)) {
      return c.json(
        {
          error: 'Insufficient permissions',
          code: 'PP002', // Business process error code for authorization
        },
        403
      );
    }

    return next();
  };
}

/**
 * Helper function to get current user from context
 */
export function getCurrentUser(c: Context) {
  const auth = c.get('auth') as AuthContext;
  return auth?.user || null;
}

/**
 * Helper function to get current session from context
 */
export function getCurrentSession(c: Context) {
  const auth = c.get('auth') as AuthContext;
  return auth?.session || null;
}
