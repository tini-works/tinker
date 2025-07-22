/**
 * Currency codes supported by the application
 */
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];

/**
 * Default currency code
 */
export const DEFAULT_CURRENCY = 'USD';

/**
 * Payment terms options (in days)
 */
export const PAYMENT_TERMS = [
  { label: 'Net 15', value: 15 },
  { label: 'Net 30', value: 30 },
  { label: 'Net 45', value: 45 },
  { label: 'Net 60', value: 60 },
  { label: 'Net 90', value: 90 },
];

/**
 * Default payment terms
 */
export const DEFAULT_PAYMENT_TERMS = 30;

/**
 * Approval threshold amounts
 * Invoices above these amounts require additional approvals
 */
export const APPROVAL_THRESHOLDS = {
  MANAGER: 5000,
  DIRECTOR: 10000,
  VP: 50000,
  CFO: 100000,
};

/**
 * Date format for display
 */
export const DATE_FORMAT = 'MMMM d, yyyy';

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  INVOICES: '/api/invoices',
  PAYMENT_REQUESTS: '/api/payment-requests',
  APPROVERS: '/api/approvers',
  USERS: '/api/users',
  AUTH: '/api/auth',
};

