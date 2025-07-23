import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
} from '../../../utils/formatters';

// Mock payment request data
interface PaymentRequest {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'pending' | 'approved' | 'completed' | 'rejected';
  vendor: string;
  department: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  approvalHistory: {
    id: string;
    status: string;
    date: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    comments?: string;
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    vendor: string;
    amount: number;
    date: string;
    status: string;
  }[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadDate: string;
  }[];
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let badgeClass = '';

  switch (status) {
    case 'draft':
      badgeClass = 'badge-ghost';
      break;
    case 'pending':
      badgeClass = 'badge-primary';
      break;
    case 'approved':
      badgeClass = 'badge-secondary';
      break;
    case 'completed':
      badgeClass = 'badge-success';
      break;
    case 'rejected':
      badgeClass = 'badge-error';
      break;
    default:
      badgeClass = 'badge-ghost';
  }

  return (
    <div className={`badge ${badgeClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}

// User avatar component
function UserAvatar({
  user,
  size = 'md',
}: {
  user: { name: string; avatar: string };
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="avatar">
        <div className={`${sizeClass} rounded-full`}>
          <img src={user.avatar} alt={user.name} />
        </div>
      </div>
      <div>
        <div className="font-medium">{user.name}</div>
      </div>
    </div>
  );
}

// Confirmation modal component
function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-outline" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ApprovalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
  });

  useEffect(() => {
    // Simulate API call to fetch payment request details
    setTimeout(() => {
      // Mock payment request data
      const mockPaymentRequest: PaymentRequest = {
        id: id || '1',
        requestNumber: `PR-2025-${id?.padStart(3, '0') || '001'}`,
        title: 'Q3 Office Supplies Payment',
        description:
          'Payment request for Q3 office supplies including stationery, printer cartridges, and break room supplies.',
        amount: 4250.75,
        date: '2025-07-15',
        dueDate: '2025-07-30',
        status: 'pending',
        vendor: 'Acme Corporation',
        department: 'Operations',
        createdBy: {
          id: '101',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          avatar: 'https://i.pravatar.cc/150?u=jane',
        },
        approvalHistory: [
          {
            id: '201',
            status: 'submitted',
            date: '2025-07-15T10:30:00Z',
            user: {
              id: '101',
              name: 'Jane Smith',
              avatar: 'https://i.pravatar.cc/150?u=jane',
            },
          },
          {
            id: '202',
            status: 'pending',
            date: '2025-07-15T10:35:00Z',
            user: {
              id: '102',
              name: 'John Doe',
              avatar: 'https://i.pravatar.cc/150?u=john',
            },
            comments: 'Assigned for review',
          },
        ],
        invoices: [
          {
            id: '301',
            invoiceNumber: 'INV-2025-101',
            vendor: 'Acme Corporation',
            amount: 1250.75,
            date: '2025-07-01',
            status: 'pending',
          },
          {
            id: '302',
            invoiceNumber: 'INV-2025-102',
            vendor: 'Acme Corporation',
            amount: 3000.0,
            date: '2025-07-05',
            status: 'pending',
          },
        ],
        attachments: [
          {
            id: '401',
            name: 'Invoice_Scan.pdf',
            type: 'application/pdf',
            size: 1024 * 1024 * 2.5, // 2.5 MB
            uploadDate: '2025-07-15T09:45:00Z',
          },
          {
            id: '402',
            name: 'Approval_Email.eml',
            type: 'message/rfc822',
            size: 1024 * 512, // 512 KB
            uploadDate: '2025-07-15T10:15:00Z',
          },
        ],
      };

      setPaymentRequest(mockPaymentRequest);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  // Handle approve action
  const handleApprove = () => {
    if (!comment.trim()) {
      alert('Please add a comment before approving.');
      return;
    }

    setModalConfig({
      isOpen: true,
      title: 'Approve Payment Request',
      message: 'Are you sure you want to approve this payment request?',
      confirmText: 'Approve',
      cancelText: 'Cancel',
      onConfirm: () => {
        setIsSubmitting(true);
        // Simulate API call to approve payment request
        setTimeout(() => {
          setPaymentRequest(prev => {
            if (!prev) return null;

            return {
              ...prev,
              status: 'approved',
              approvalHistory: [
                ...prev.approvalHistory,
                {
                  id: Date.now().toString(),
                  status: 'approved',
                  date: new Date().toISOString(),
                  user: {
                    id: '103',
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?u=current',
                  },
                  comments: comment,
                },
              ],
            };
          });
          setIsSubmitting(false);
          setModalConfig(prev => ({ ...prev, isOpen: false }));
          navigate(`/payment-requests/${id}?approved=true`);
        }, 1500);
      },
    });
  };

  // Handle reject action
  const handleReject = () => {
    if (!comment.trim()) {
      alert('Please add a comment before rejecting.');
      return;
    }

    setModalConfig({
      isOpen: true,
      title: 'Reject Payment Request',
      message: 'Are you sure you want to reject this payment request?',
      confirmText: 'Reject',
      cancelText: 'Cancel',
      onConfirm: () => {
        setIsSubmitting(true);
        // Simulate API call to reject payment request
        setTimeout(() => {
          setPaymentRequest(prev => {
            if (!prev) return null;

            return {
              ...prev,
              status: 'rejected',
              approvalHistory: [
                ...prev.approvalHistory,
                {
                  id: Date.now().toString(),
                  status: 'rejected',
                  date: new Date().toISOString(),
                  user: {
                    id: '103',
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?u=current',
                  },
                  comments: comment,
                },
              ],
            };
          });
          setIsSubmitting(false);
          setModalConfig(prev => ({ ...prev, isOpen: false }));
          navigate(`/payment-requests/${id}?rejected=true`);
        }, 1500);
      },
    });
  };

  // Handle request changes action
  const handleRequestChanges = () => {
    if (!comment.trim()) {
      alert('Please add a comment before requesting changes.');
      return;
    }

    setModalConfig({
      isOpen: true,
      title: 'Request Changes',
      message:
        'Are you sure you want to request changes to this payment request?',
      confirmText: 'Request Changes',
      cancelText: 'Cancel',
      onConfirm: () => {
        setIsSubmitting(true);
        // Simulate API call to request changes
        setTimeout(() => {
          setPaymentRequest(prev => {
            if (!prev) return null;

            return {
              ...prev,
              status: 'draft',
              approvalHistory: [
                ...prev.approvalHistory,
                {
                  id: Date.now().toString(),
                  status: 'changes_requested',
                  date: new Date().toISOString(),
                  user: {
                    id: '103',
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?u=current',
                  },
                  comments: comment,
                },
              ],
            };
          });
          setIsSubmitting(false);
          setModalConfig(prev => ({ ...prev, isOpen: false }));
          navigate(`/payment-requests/${id}?changes_requested=true`);
        }, 1500);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!paymentRequest) {
    return (
      <div className="container mx-auto p-4">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Payment request not found.</span>
        </div>
        <div className="mt-4">
          <Link to="/payment-requests" className="btn btn-primary">
            Back to Payment Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link
          to={`/payment-requests/${id}`}
          className="btn btn-ghost btn-sm mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Review Payment Request</h1>
      </div>

      {/* Header Card */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="card-title text-xl">{paymentRequest.title}</h2>
                <StatusBadge status={paymentRequest.status} />
              </div>
              <p className="text-base-content/70">
                {paymentRequest.requestNumber}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <div className="text-sm opacity-70">Amount</div>
              <div className="text-xl font-bold">
                {formatCurrency(paymentRequest.amount)}
              </div>
            </div>

            <div>
              <div className="text-sm opacity-70">Due Date</div>
              <div>{formatDate(paymentRequest.dueDate)}</div>
            </div>

            <div>
              <div className="text-sm opacity-70">Created By</div>
              <UserAvatar user={paymentRequest.createdBy} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Payment Request Details */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">
                Payment Request Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm opacity-70">Request Number</div>
                  <div>{paymentRequest.requestNumber}</div>
                </div>

                <div>
                  <div className="text-sm opacity-70">Vendor</div>
                  <div>{paymentRequest.vendor}</div>
                </div>

                <div>
                  <div className="text-sm opacity-70">Department</div>
                  <div>{paymentRequest.department}</div>
                </div>

                <div>
                  <div className="text-sm opacity-70">Created Date</div>
                  <div>{formatDate(paymentRequest.date)}</div>
                </div>
              </div>

              <div className="divider" />

              <div>
                <div className="text-sm opacity-70 mb-2">Description</div>
                <div className="whitespace-pre-wrap">
                  {paymentRequest.description}
                </div>
              </div>
            </div>
          </div>

          {/* Linked Invoices */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">Linked Invoices</h3>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentRequest.invoices.map(invoice => (
                      <tr key={invoice.id}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.vendor}</td>
                        <td>{formatCurrency(invoice.amount)}</td>
                        <td>{formatDate(invoice.date)}</td>
                        <td>
                          <div
                            className={`badge ${
                              invoice.status === 'pending'
                                ? 'badge-primary'
                                : invoice.status === 'approved'
                                  ? 'badge-secondary'
                                  : invoice.status === 'paid'
                                    ? 'badge-success'
                                    : 'badge-ghost'
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </div>
                        </td>
                        <td>
                          <Link
                            to={`/invoices/${invoice.id}`}
                            className="btn btn-sm btn-outline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <div className="text-sm opacity-70">Total Amount</div>
                <div className="text-xl font-bold">
                  {formatCurrency(paymentRequest.amount)}
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">Attachments</h3>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Upload Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentRequest.attachments.map(attachment => (
                      <tr key={attachment.id}>
                        <td>{attachment.name}</td>
                        <td>{attachment.type.split('/')[1].toUpperCase()}</td>
                        <td>
                          {attachment.size < 1024 * 1024
                            ? `${Math.round(attachment.size / 1024)} KB`
                            : `${(attachment.size / (1024 * 1024)).toFixed(2)} MB`}
                        </td>
                        <td>{formatDate(attachment.uploadDate)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Approval History */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">Approval History</h3>

              <ul className="timeline timeline-vertical">
                {paymentRequest.approvalHistory.map((history, index) => (
                  <li key={history.id}>
                    {index < paymentRequest.approvalHistory.length - 1 && (
                      <hr />
                    )}
                    <div className="timeline-start">
                      {formatDate(history.date)}
                    </div>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="timeline-end timeline-box">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold">
                            {history.status.charAt(0).toUpperCase() +
                              history.status.slice(1)}
                          </div>
                          <div className="text-sm opacity-70">
                            {formatRelativeTime(history.date)}
                          </div>
                        </div>
                        <UserAvatar user={history.user} size="sm" />
                      </div>
                      {history.comments && (
                        <div className="mt-2 text-sm">{history.comments}</div>
                      )}
                    </div>
                    {index === paymentRequest.approvalHistory.length - 1 && (
                      <hr />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Approval Actions */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Approval Actions</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comments</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Add your comments or feedback here..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {!comment.trim() &&
                      'Comments are required before taking any action'}
                  </span>
                </label>
              </div>

              <div className="space-y-4 mt-4">
                <button
                  className="btn btn-success w-full"
                  onClick={handleApprove}
                  disabled={isSubmitting || !comment.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Approve
                    </>
                  )}
                </button>

                <button
                  className="btn btn-warning w-full"
                  onClick={handleRequestChanges}
                  disabled={isSubmitting || !comment.trim()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Request Changes
                </button>

                <button
                  className="btn btn-error w-full"
                  onClick={handleReject}
                  disabled={isSubmitting || !comment.trim()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reject
                </button>

                <div className="divider" />

                <Link
                  to={`/payment-requests/${id}`}
                  className="btn btn-outline w-full"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
