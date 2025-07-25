import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { UserService } from '../../services/user.service';
import { authMiddleware, requireAuth, requireRole, getCurrentUser } from '../../middleware/auth';
import { logger } from '../../utils/logger';

const usersRoutes = new Hono();

// Apply auth middleware to all routes
usersRoutes.use('*', authMiddleware);

// Validation schemas
const updateUserSchema = {
  name: (value: any) => typeof value === 'string' && value.length > 0,
  role: (value: any) => ['invoice_processor', 'payment_request_creator', 'approver', 'finance_officer', 'admin'].includes(value),
  emailVerified: (value: any) => typeof value === 'boolean',
  image: (value: any) => typeof value === 'string',
};

const querySchema = {
  page: (value: any) => !value || (!isNaN(parseInt(value)) && parseInt(value) > 0),
  limit: (value: any) => !value || (!isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= 100),
  role: (value: any) => !value || ['invoice_processor', 'payment_request_creator', 'approver', 'finance_officer', 'admin'].includes(value),
  emailVerified: (value: any) => !value || ['true', 'false'].includes(value),
  search: (value: any) => !value || typeof value === 'string',
  sortBy: (value: any) => !value || ['name', 'email', 'role', 'createdAt'].includes(value),
  sortOrder: (value: any) => !value || ['asc', 'desc'].includes(value),
};

/**
 * GET /users - Get all users with filtering and pagination
 * Requires: user.read permission
 */
usersRoutes.get(
  '/',
  requireAuth,
  validator('query', (value, c) => {
    const errors: string[] = [];
    
    for (const [key, validate] of Object.entries(querySchema)) {
      if (value[key] !== undefined && !validate(value[key])) {
        errors.push(`Invalid ${key}`);
      }
    }
    
    if (errors.length > 0) {
      return c.json({ error: 'Validation failed', details: errors }, 400);
    }
    
    return value;
  }),
  async (c) => {
    try {
      const currentUser = getCurrentUser(c);
      if (!currentUser || !UserService.hasPermission(currentUser.role, 'user.read')) {
        return c.json(
          { 
            error: 'Insufficient permissions',
            code: 'UM003'
          }, 
          403
        );
      }

      const query = c.req.query();
      const filters = {
        role: query.role,
        emailVerified: query.emailVerified ? query.emailVerified === 'true' : undefined,
        search: query.search,
      };

      const pagination = {
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        sortBy: query.sortBy as any,
        sortOrder: query.sortOrder as any,
      };

      const result = await UserService.getUsers(filters, pagination);

      return c.json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      logger.error('Error in GET /users:', error);
      return c.json(
        { 
          error: 'Failed to retrieve users',
          code: 'UM004'
        }, 
        500
      );
    }
  }
);

/**
 * GET /users/stats - Get user statistics
 * Requires: admin role
 */
usersRoutes.get(
  '/stats',
  requireAuth,
  requireRole('admin', 'finance_officer'),
  async (c) => {
    try {
      const stats = await UserService.getUserStats();

      return c.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      logger.error('Error in GET /users/stats:', error);
      return c.json(
        { 
          error: 'Failed to retrieve user statistics',
          code: 'UM005'
        }, 
        500
      );
    }
  }
);

/**
 * GET /users/:id - Get user by ID
 * Requires: user.read permission
 */
usersRoutes.get(
  '/:id',
  requireAuth,
  async (c) => {
    try {
      const currentUser = getCurrentUser(c);
      const userId = c.req.param('id');

      // Users can view their own profile, or need user.read permission
      if (currentUser?.id !== userId && !UserService.hasPermission(currentUser?.role || '', 'user.read')) {
        return c.json(
          { 
            error: 'Insufficient permissions',
            code: 'UM003'
          }, 
          403
        );
      }

      const user = await UserService.getUserById(userId);

      if (!user) {
        return c.json(
          { 
            error: 'User not found',
            code: 'UM006'
          }, 
          404
        );
      }

      return c.json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error('Error in GET /users/:id:', error);
      return c.json(
        { 
          error: 'Failed to retrieve user',
          code: 'UM007'
        }, 
        500
      );
    }
  }
);

/**
 * PUT /users/:id - Update user
 * Requires: user.update permission or updating own profile
 */
usersRoutes.put(
  '/:id',
  requireAuth,
  validator('json', (value, c) => {
    const errors: string[] = [];
    
    for (const [key, validate] of Object.entries(updateUserSchema)) {
      if (value[key] !== undefined && !validate(value[key])) {
        errors.push(`Invalid ${key}`);
      }
    }
    
    if (errors.length > 0) {
      return c.json({ error: 'Validation failed', details: errors }, 400);
    }
    
    return value;
  }),
  async (c) => {
    try {
      const currentUser = getCurrentUser(c);
      const userId = c.req.param('id');
      const updateData = await c.req.json();

      // Users can update their own profile (except role), or need user.update permission
      const canUpdateOwnProfile = currentUser?.id === userId && !updateData.role;
      const hasUpdatePermission = UserService.hasPermission(currentUser?.role || '', 'user.update');

      if (!canUpdateOwnProfile && !hasUpdatePermission) {
        return c.json(
          { 
            error: 'Insufficient permissions',
            code: 'UM003'
          }, 
          403
        );
      }

      // Only admins can change roles
      if (updateData.role && currentUser?.role !== 'admin') {
        return c.json(
          { 
            error: 'Only administrators can change user roles',
            code: 'UM008'
          }, 
          403
        );
      }

      const updatedUser = await UserService.updateUser(
        userId, 
        updateData, 
        currentUser?.id || 'system'
      );

      return c.json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully',
      });
    } catch (error) {
      logger.error('Error in PUT /users/:id:', error);
      
      if (error instanceof Error && error.message === 'User not found') {
        return c.json(
          { 
            error: 'User not found',
            code: 'UM006'
          }, 
          404
        );
      }

      return c.json(
        { 
          error: 'Failed to update user',
          code: 'UM001'
        }, 
        500
      );
    }
  }
);

/**
 * DELETE /users/:id - Delete user (soft delete)
 * Requires: admin role
 */
usersRoutes.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  async (c) => {
    try {
      const currentUser = getCurrentUser(c);
      const userId = c.req.param('id');

      // Prevent self-deletion
      if (currentUser?.id === userId) {
        return c.json(
          { 
            error: 'Cannot delete your own account',
            code: 'UM009'
          }, 
          400
        );
      }

      const deletedUser = await UserService.deleteUser(
        userId, 
        currentUser?.id || 'system'
      );

      return c.json({
        success: true,
        data: deletedUser,
        message: 'User deleted successfully',
      });
    } catch (error) {
      logger.error('Error in DELETE /users/:id:', error);
      
      if (error instanceof Error && error.message === 'User not found') {
        return c.json(
          { 
            error: 'User not found',
            code: 'UM006'
          }, 
          404
        );
      }

      return c.json(
        { 
          error: 'Failed to delete user',
          code: 'UM002'
        }, 
        500
      );
    }
  }
);

/**
 * GET /users/:id/permissions - Get user permissions
 * Requires: authenticated user
 */
usersRoutes.get(
  '/:id/permissions',
  requireAuth,
  async (c) => {
    try {
      const currentUser = getCurrentUser(c);
      const userId = c.req.param('id');

      // Users can view their own permissions, or need user.read permission
      if (currentUser?.id !== userId && !UserService.hasPermission(currentUser?.role || '', 'user.read')) {
        return c.json(
          { 
            error: 'Insufficient permissions',
            code: 'UM003'
          }, 
          403
        );
      }

      const user = await UserService.getUserById(userId);

      if (!user) {
        return c.json(
          { 
            error: 'User not found',
            code: 'UM006'
          }, 
          404
        );
      }

      // Define all possible permissions
      const allPermissions = [
        'user.read',
        'user.update',
        'invoice.read',
        'invoice.create',
        'invoice.update',
        'payment.read',
        'payment.create',
        'payment.update',
        'approval.read',
        'approval.approve',
      ];

      const userPermissions = allPermissions.filter(permission => 
        UserService.hasPermission(user.role, permission)
      );

      return c.json({
        success: true,
        data: {
          userId: user.id,
          role: user.role,
          permissions: userPermissions,
          isAdmin: user.role === 'admin',
        },
      });
    } catch (error) {
      logger.error('Error in GET /users/:id/permissions:', error);
      return c.json(
        { 
          error: 'Failed to retrieve user permissions',
          code: 'UM010'
        }, 
        500
      );
    }
  }
);

export default usersRoutes;
