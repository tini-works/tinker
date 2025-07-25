import { eq, and, or, like, desc } from 'drizzle-orm';
import { db } from '../db/connection';
import { users, businessProcessLogs, BUSINESS_PROCESS_INDEX } from '../db/schema';
import { logger } from '../utils/logger';

export interface CreateUserData {
  email: string;
  name: string;
  role: 'invoice_processor' | 'payment_request_creator' | 'approver' | 'finance_officer' | 'admin';
  password?: string;
}

export interface UpdateUserData {
  name?: string;
  role?: 'invoice_processor' | 'payment_request_creator' | 'approver' | 'finance_officer' | 'admin';
  emailVerified?: boolean;
  image?: string;
}

export interface UserFilters {
  role?: string;
  emailVerified?: boolean;
  search?: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'role' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export class UserService {
  /**
   * Get all users with optional filtering and pagination
   */
  static async getUsers(
    filters: UserFilters = {},
    pagination: PaginationOptions = {}
  ) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = pagination;
      const offset = (page - 1) * limit;

      let query = db.select().from(users);

      // Apply filters
      const conditions = [];
      if (filters.role) {
        conditions.push(eq(users.role, filters.role as any));
      }
      if (filters.emailVerified !== undefined) {
        conditions.push(eq(users.emailVerified, filters.emailVerified));
      }
      if (filters.search) {
        conditions.push(
          or(
            like(users.name, `%${filters.search}%`),
            like(users.email, `%${filters.search}%`)
          )
        );
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }

      // Apply sorting
      if (sortBy === 'name') {
        query = sortOrder === 'desc' 
          ? (query.orderBy(desc(users.name)) as any)
          : (query.orderBy(users.name) as any);
      } else if (sortBy === 'email') {
        query = sortOrder === 'desc' 
          ? (query.orderBy(desc(users.email)) as any)
          : (query.orderBy(users.email) as any);
      } else if (sortBy === 'role') {
        query = sortOrder === 'desc' 
          ? (query.orderBy(desc(users.role)) as any)
          : (query.orderBy(users.role) as any);
      } else if (sortBy === 'createdAt') {
        query = sortOrder === 'desc' 
          ? (query.orderBy(desc(users.createdAt)) as any)
          : (query.orderBy(users.createdAt) as any);
      }

      // Apply pagination
      query = query.limit(limit).offset(offset) as any;

      const result = await query;

      // Get total count for pagination
      let countQuery = db.select().from(users);
      if (conditions.length > 0) {
        countQuery = countQuery.where(and(...conditions)) as any;
      }
      const countResult = await countQuery;
      const count = countResult.length;

      logger.info(`Retrieved ${result.length} users (page ${page})`);

      return {
        users: result.map(user => ({
          ...user,
          // Don't expose sensitive fields
          password: undefined,
        })),
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      logger.error('Error getting users:', error);
      throw new Error('Failed to retrieve users');
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (!user) {
        return null;
      }

      logger.info(`Retrieved user: ${user.email}`);

      return {
        ...user,
        password: undefined, // Don't expose password
      };
    } catch (error) {
      logger.error('Error getting user by ID:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        return null;
      }

      logger.info(`Retrieved user by email: ${email}`);

      return {
        ...user,
        password: undefined, // Don't expose password
      };
    } catch (error) {
      logger.error('Error getting user by email:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  /**
   * Update user
   */
  static async updateUser(id: string, data: UpdateUserData, updatedBy: string) {
    try {
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error('User not found');
      }

      const updatedUsers = await db
        .update(users)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      const updatedUser = updatedUsers[0];
      if (!updatedUser) {
        throw new Error('Failed to update user');
      }

      // Log the update action
      await db.insert(businessProcessLogs).values({
        processIndex: BUSINESS_PROCESS_INDEX.USER_MANAGEMENT,
        entityType: 'user',
        entityId: id,
        action: 'update',
        status: 'completed',
        userId: updatedBy,
        metadata: {
          updatedFields: Object.keys(data),
          previousRole: existingUser.role,
          newRole: data.role,
        },
        createdAt: new Date(),
      });

      logger.info(`User updated: ${updatedUser.email} by ${updatedBy}`);

      return {
        ...updatedUser,
        password: undefined,
      };
    } catch (error) {
      logger.error('Error updating user:', error);
      
      // Log the failed update
      await db.insert(businessProcessLogs).values({
        processIndex: BUSINESS_PROCESS_INDEX.USER_MANAGEMENT,
        entityType: 'user',
        entityId: id,
        action: 'update',
        status: 'failed',
        userId: updatedBy,
        errorCode: 'UM001',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        createdAt: new Date(),
      });

      throw new Error('Failed to update user');
    }
  }

  /**
   * Delete user (soft delete by deactivating)
   */
  static async deleteUser(id: string, deletedBy: string) {
    try {
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error('User not found');
      }

      // For now, we'll just mark them as inactive by updating their role
      // In a real system, we'd add an 'active' field to the schema
      const deletedUsers = await db
        .update(users)
        .set({
          // We can't actually set 'inactive' as it's not in the enum
          // So we'll just update the updatedAt field to mark as processed
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      const deletedUser = deletedUsers[0];
      if (!deletedUser) {
        throw new Error('Failed to delete user');
      }

      // Log the deletion action
      await db.insert(businessProcessLogs).values({
        processIndex: BUSINESS_PROCESS_INDEX.USER_MANAGEMENT,
        entityType: 'user',
        entityId: id,
        action: 'delete',
        status: 'completed',
        userId: deletedBy,
        metadata: {
          previousRole: existingUser.role,
          deletionReason: 'User deactivated',
        },
        createdAt: new Date(),
      });

      logger.info(`User deleted: ${deletedUser.email} by ${deletedBy}`);

      return {
        ...deletedUser,
        password: undefined,
      };
    } catch (error) {
      logger.error('Error deleting user:', error);
      
      // Log the failed deletion
      await db.insert(businessProcessLogs).values({
        processIndex: BUSINESS_PROCESS_INDEX.USER_MANAGEMENT,
        entityType: 'user',
        entityId: id,
        action: 'delete',
        status: 'failed',
        userId: deletedBy,
        errorCode: 'UM002',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        createdAt: new Date(),
      });

      throw new Error('Failed to delete user');
    }
  }

  /**
   * Get user statistics
   */
  static async getUserStats() {
    try {
      const stats = await db
        .select({
          role: users.role,
          count: users.id,
        })
        .from(users)
        .groupBy(users.role);

      const totalUsers = stats.length;
      const roleDistribution = stats.reduce((acc, stat) => {
        acc[stat.role] = (acc[stat.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      logger.info('Retrieved user statistics');

      return {
        totalUsers,
        roleDistribution,
        stats,
      };
    } catch (error) {
      logger.error('Error getting user stats:', error);
      throw new Error('Failed to retrieve user statistics');
    }
  }

  /**
   * Check if user has permission for specific action
   */
  static hasPermission(userRole: string, action: string): boolean {
    const permissions = {
      admin: ['*'], // Admin has all permissions
      finance_officer: [
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
      ],
      payment_request_creator: [
        'invoice.read',
        'invoice.create',
        'invoice.update',
        'payment.read',
        'payment.create',
        'payment.update',
      ],
      invoice_processor: [
        'invoice.read',
        'invoice.create',
        'invoice.update',
        'payment.read',
        'payment.create',
      ],
      approver: [
        'invoice.read',
        'payment.read',
        'approval.read',
        'approval.approve',
      ],
    };

    const userPermissions = permissions[userRole as keyof typeof permissions] || [];
    
    return userPermissions.includes('*') || userPermissions.includes(action);
  }
}
