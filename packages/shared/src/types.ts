// Invoice Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  description?: string;
}

export enum InvoiceStatus {
  PENDING = 'PENDING',
  LINKED = 'LINKED',
  OBSOLETE = 'OBSOLETE'
}

// Payment Request Types
export interface PaymentRequest {
  id: string;
  requestNumber: string;
  createdBy: string;
  department: string;
  amount: number;
  date: string;
  status: PaymentRequestStatus;
  description?: string;
  invoices: Invoice[];
}

export enum PaymentRequestStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  FINANCE = 'FINANCE'
}

// Activity Types
export interface Activity {
  id: string;
  date: string;
  user: string;
  action: ActivityAction;
  item: string;
}

export enum ActivityAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  IMPORTED = 'IMPORTED'
}

