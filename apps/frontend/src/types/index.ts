// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'approver' | 'finance' | 'user';
  avatar?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'pending' | 'linked' | 'completed' | 'obsolete';
  description?: string;
  additionalInfo?: string;
}

export interface PaymentRequest {
  id: string;
  requestNumber: string;
  createdBy: string;
  createdAt: string;
  department: string;
  amount: number;
  status: 'draft' | 'in-review' | 'approved' | 'completed' | 'rejected';
  description?: string;
  linkedInvoices: string[];
}

export interface Activity {
  id: string;
  type:
    | 'created'
    | 'approved'
    | 'completed'
    | 'imported'
    | 'rejected'
    | 'reverted';
  user: string;
  timestamp: string;
  item: string;
  itemType: 'invoice' | 'payment-request';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
}

export interface SystemStatus {
  component: string;
  status: 'operational' | 'maintenance' | 'outage';
  lastUpdated: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  message?: string;
}
