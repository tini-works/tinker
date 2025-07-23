import { apiClient } from './api';
import { User, ApiResponse } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Authentication service for handling user login, logout, and session management
 */
export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        credentials
      );

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return {
          data: response.data.user,
          status: response.status,
        };
      }

      return {
        error: response.error || 'Login failed',
        status: response.status,
      };
    } catch (error) {
      console.error('Login Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      };
    }
  },

  /**
   * Logout current user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch (error) {
        console.error('Error parsing user JSON:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
