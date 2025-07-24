import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

// Helper function to generate IDs
export const generateId = () => nanoid();

// User table (better-auth integration)
export const users = sqliteTable(
  'user',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    role: text('role', { 
      enum: ['invoice_processor', 'payment_request_creator', 'approver', 'finance_officer', 'admin'] 
    }).notNull().default('invoice_processor'),
    emailVerified: integer('emailVerified', { mode: 'boolean' }).default(false),
    image: text('image'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  }
);

// Session table (better-auth integration)
export const sessions = sqliteTable(
  'session',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
    token: text('token').notNull().unique(),
  }
);

// Account table (better-auth OAuth integration)
export const accounts = sqliteTable(
  'account',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    expiresAt: integer('expiresAt', { mode: 'timestamp' }),
  }
);

// Invoice table
export const invoices = sqliteTable(
  'invoices',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    batchId: text('batch_id').notNull(),
    amount: real('amount').notNull(),
    invoiceDate: integer('invoice_date', { mode: 'timestamp' }).notNull(),
    vendor: text('vendor').notNull(),
    status: text('status', { 
      enum: ['imported', 'linked', 'completed', 'obsolete'] 
    }).notNull().default('imported'),
    importedBy: text('imported_by').notNull().references(() => users.id),
    metadata: text('metadata', { mode: 'json' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => ({
    statusIdx: index('idx_invoices_status').on(table.status),
    batchIdIdx: index('idx_invoices_batch_id').on(table.batchId),
    importedByIdx: index('idx_invoices_imported_by').on(table.importedBy),
  })
);

// Payment Request table
export const paymentRequests = sqliteTable(
  'payment_requests',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    totalAmount: real('total_amount').notNull(),
    requestDate: integer('request_date', { mode: 'timestamp' }).notNull(),
    description: text('description'),
    status: text('status', { 
      enum: ['draft', 'in_review', 'approved', 'completed'] 
    }).notNull().default('draft'),
    createdBy: text('created_by').notNull().references(() => users.id),
    currentApprover: text('current_approver').references(() => users.id),
    approvalWorkflow: text('approval_workflow', { mode: 'json' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => ({
    statusIdx: index('idx_payment_requests_status').on(table.status),
    createdByIdx: index('idx_payment_requests_created_by').on(table.createdBy),
    currentApproverIdx: index('idx_payment_requests_current_approver').on(table.currentApprover),
  })
);

// Junction table for Invoice-PaymentRequest relationship
export const invoicePaymentRequests = sqliteTable(
  'invoice_payment_requests',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    invoiceId: text('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
    paymentRequestId: text('payment_request_id').notNull().references(() => paymentRequests.id, { onDelete: 'cascade' }),
    linkedAt: integer('linked_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => ({
    invoiceIdx: index('idx_invoice_payment_requests_invoice').on(table.invoiceId),
    paymentRequestIdx: index('idx_invoice_payment_requests_pr').on(table.paymentRequestId),
    uniqueLink: index('idx_invoice_payment_requests_unique').on(table.invoiceId, table.paymentRequestId),
  })
);

// Approval History table
export const approvalHistory = sqliteTable(
  'approval_history',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    paymentRequestId: text('payment_request_id').notNull().references(() => paymentRequests.id, { onDelete: 'cascade' }),
    approverId: text('approver_id').notNull().references(() => users.id),
    action: text('action', { 
      enum: ['submitted', 'approved', 'rejected', 'changes_requested'] 
    }).notNull(),
    comments: text('comments'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => ({
    paymentRequestIdx: index('idx_approval_history_payment_request_id').on(table.paymentRequestId),
    approverIdx: index('idx_approval_history_approver_id').on(table.approverId),
    actionIdx: index('idx_approval_history_action').on(table.action),
  })
);

// Business Process Log table for tracking all business operations
export const businessProcessLogs = sqliteTable(
  'business_process_logs',
  {
    id: text('id').primaryKey().$defaultFn(() => generateId()),
    processIndex: integer('process_index').notNull(),
    entityType: text('entity_type', { 
      enum: ['invoice', 'payment_request', 'approval', 'user'] 
    }).notNull(),
    entityId: text('entity_id').notNull(),
    status: text('status', { 
      enum: ['started', 'completed', 'failed'] 
    }).notNull(),
    errorCode: text('error_code'),
    details: text('details', { mode: 'json' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => ({
    processIndexIdx: index('idx_business_process_logs_process_index').on(table.processIndex),
    entityIdx: index('idx_business_process_logs_entity').on(table.entityType, table.entityId),
    statusIdx: index('idx_business_process_logs_status').on(table.status),
    errorCodeIdx: index('idx_business_process_logs_error_code').on(table.errorCode),
  })
);

// Type exports for use in application code
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

export type PaymentRequest = typeof paymentRequests.$inferSelect;
export type NewPaymentRequest = typeof paymentRequests.$inferInsert;

export type InvoicePaymentRequest = typeof invoicePaymentRequests.$inferSelect;
export type NewInvoicePaymentRequest = typeof invoicePaymentRequests.$inferInsert;

export type ApprovalHistory = typeof approvalHistory.$inferSelect;
export type NewApprovalHistory = typeof approvalHistory.$inferInsert;

export type BusinessProcessLog = typeof businessProcessLogs.$inferSelect;
export type NewBusinessProcessLog = typeof businessProcessLogs.$inferInsert;

// Business Process Index Constants (from documentation)
export const BUSINESS_PROCESS_INDEX = {
  IMPORT_INVOICES: 1,
  CREATE_PAYMENT_REQUEST: 2,
  LINK_INVOICES_TO_PR: 3,
  SUBMIT_FOR_APPROVAL: 4,
  REVIEW_PAYMENT_REQUEST: 5,
  REQUEST_CHANGES: 6,
  MAKE_CHANGES: 7,
  APPROVE_PAYMENT_REQUEST: 8,
  MAKE_PAYMENT: 9,
  MARK_AS_COMPLETED: 10,
  REVERT_PAYMENT_REQUEST: 11,
} as const;

// Error Code Ranges (from documentation)
export const ERROR_CODE_RANGES = {
  IMPORT_INVOICES: { start: 1001, end: 1099 },
  CREATE_PAYMENT_REQUEST: { start: 2001, end: 2099 },
  LINK_INVOICES_TO_PR: { start: 3001, end: 3099 },
  SUBMIT_FOR_APPROVAL: { start: 4001, end: 4099 },
  REVIEW_PAYMENT_REQUEST: { start: 5001, end: 5099 },
  REQUEST_CHANGES: { start: 6001, end: 6099 },
  MAKE_CHANGES: { start: 7001, end: 7099 },
  APPROVE_PAYMENT_REQUEST: { start: 8001, end: 8099 },
  MAKE_PAYMENT: { start: 9001, end: 9099 },
  MARK_AS_COMPLETED: { start: 10001, end: 10099 },
  REVERT_PAYMENT_REQUEST: { start: 11001, end: 11099 },
} as const;

// Common error codes
export const ERROR_CODES = {
  // Import Invoices (01xxx)
  INVALID_FILE_FORMAT: '01001',
  DUPLICATE_INVOICE_DETECTED: '01002',
  MISSING_REQUIRED_FIELDS: '01003',
  
  // Create Payment Request (02xxx)
  INSUFFICIENT_PERMISSIONS: '02001',
  INVALID_AMOUNT: '02002',
  
  // Link Invoices (03xxx)
  INVOICE_ALREADY_LINKED: '03001',
  INVOICE_NOT_FOUND: '03002',
  
  // Submit for Approval (04xxx)
  NO_INVOICES_LINKED: '04001',
  INVALID_APPROVAL_WORKFLOW: '04002',
} as const;
