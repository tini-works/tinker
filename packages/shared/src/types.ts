// Shared types for the Invoice Approval System

// Invoice status
export enum InvoiceStatus {
  PENDING = 'PENDING',
  LINKED = 'LINKED',
  OBSOLETE = 'OBSOLETE',
}

// Payment request status
export enum PaymentRequestStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  COMPLETED = 'COMPLETED',
}

// Invoice interface
export interface Invoice {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  description: string;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt: string;
}

// Payment request interface
export interface PaymentRequest {
  id: string;
  title: string;
  description: string;
  department: string;
  createdBy: string;
  status: PaymentRequestStatus;
  invoices: string[]; // Array of invoice IDs
  totalAmount: number;
  approvalHistory: ApprovalEvent[];
  createdAt: string;
  updatedAt: string;
}

// Approval event interface
export interface ApprovalEvent {
  id: string;
  userId: string;
  userName: string;
  action: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  comment: string;
  timestamp: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'ADMIN' | 'APPROVER' | 'FINANCE' | 'USER';
}
