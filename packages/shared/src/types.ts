/**
 * Invoice interface representing an invoice in the system
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  description?: string;
  attachments?: string[];
}

/**
 * Payment Request interface representing a payment request in the system
 */
export interface PaymentRequest {
  id: string;
  requestNumber: string;
  invoices: Invoice[];
  totalAmount: number;
  currency: string;
  requestDate: string;
  dueDate: string;
  status: PaymentRequestStatus;
  approvers: Approver[];
  description?: string;
}

/**
 * Approver interface representing an approver in the system
 */
export interface Approver {
  id: string;
  name: string;
  email: string;
  role: string;
  approved?: boolean;
  approvalDate?: string;
  comments?: string;
}

/**
 * Invoice status enum
 */
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

/**
 * Payment request status enum
 */
export enum PaymentRequestStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  PARTIALLY_APPROVED = 'PARTIALLY_APPROVED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

