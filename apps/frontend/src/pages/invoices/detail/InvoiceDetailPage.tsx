import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../utils/formatters';

// Mock invoice data
interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  amount: number;
  date: string;
  dueDate: string;
  status: string;
  description: string;
  poNumber?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
}

// Mock payment request data
interface PaymentRequest {
  id: string;
  requestNumber: string;
  amount: number;
  date: string;
  status: string;
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let badgeClass = '';

  switch (status) {
    case 'pending':
      badgeClass = 'badge-primary';
      break;
    case 'linked':
      badgeClass = 'badge-secondary';
      break;
    case 'completed':
      badgeClass = 'badge-success';
      break;
    case 'obsolete':
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

export function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [linkedPaymentRequests, setLinkedPaymentRequests] = useState<
    PaymentRequest[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<Invoice | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch invoice details
    setTimeout(() => {
      // Mock invoice data
      const mockInvoice: Invoice = {
        id: id || '1',
        invoiceNumber: `INV-2025-${id?.padStart(3, '0') || '001'}`,
        vendor: 'Acme Corporation',
        amount: 1250.75,
        date: '2025-07-15',
        dueDate: '2025-08-15',
        status: 'pending',
        description: 'Monthly service subscription',
        poNumber: 'PO-2025-042',
        contactName: 'John Smith',
        contactEmail: 'john.smith@acme.com',
        contactPhone: '(555) 123-4567',
        notes: 'Priority processing requested',
      };

      // Mock linked payment requests
      const mockPaymentRequests: PaymentRequest[] = [
        {
          id: '101',
          requestNumber: 'PR-2025-101',
          amount: 750.5,
          date: '2025-07-20',
          status: 'pending',
        },
        {
          id: '102',
          requestNumber: 'PR-2025-102',
          amount: 500.25,
          date: '2025-07-22',
          status: 'completed',
        },
      ];

      setInvoice(mockInvoice);
      setEditedInvoice(mockInvoice);
      setLinkedPaymentRequests(mockPaymentRequests);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  // Handle edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setInvoice(editedInvoice);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Handle input change
  const handleInputChange = (field: keyof Invoice, value: string | number) => {
    if (editedInvoice) {
      setEditedInvoice({
        ...editedInvoice,
        [field]: value,
      });
    }
  };

  // Handle mark as obsolete
  const handleMarkObsolete = () => {
    setShowConfirmDialog(true);
  };

  // Confirm mark as obsolete
  const confirmMarkObsolete = () => {
    if (invoice) {
      setInvoice({
        ...invoice,
        status: 'obsolete',
      });
      setShowConfirmDialog(false);
    }
  };

  // Cancel mark as obsolete
  const cancelMarkObsolete = () => {
    setShowConfirmDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="container mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">Invoice Not Found</h2>
            <p>
              The invoice you are looking for does not exist or has been
              removed.
            </p>
            <div className="card-actions justify-end mt-4">
              <Link to="/invoices" className="btn btn-primary">
                Back to Invoices
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link to="/invoices" className="btn btn-ghost btn-sm mr-2">
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
        <h1 className="text-2xl font-bold">Invoice Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <h2 className="card-title text-xl">
                  {isEditing ? (
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={editedInvoice?.invoiceNumber || ''}
                      onChange={e =>
                        handleInputChange('invoiceNumber', e.target.value)
                      }
                    />
                  ) : (
                    invoice.invoiceNumber
                  )}
                </h2>
                <StatusBadge status={invoice.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Vendor
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={editedInvoice?.vendor || ''}
                        onChange={e =>
                          handleInputChange('vendor', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">{invoice.vendor}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Amount
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        className="input input-bordered w-full mt-1"
                        value={editedInvoice?.amount || 0}
                        onChange={e =>
                          handleInputChange(
                            'amount',
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    ) : (
                      <p className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Invoice Date
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        className="input input-bordered w-full mt-1"
                        value={editedInvoice?.date || ''}
                        onChange={e =>
                          handleInputChange('date', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">{formatDate(invoice.date)}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Due Date
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        className="input input-bordered w-full mt-1"
                        value={editedInvoice?.dueDate || ''}
                        onChange={e =>
                          handleInputChange('dueDate', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">
                        {formatDate(invoice.dueDate)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        className="textarea textarea-bordered w-full mt-1"
                        value={editedInvoice?.description || ''}
                        onChange={e =>
                          handleInputChange('description', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">{invoice.description}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      PO Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={editedInvoice?.poNumber || ''}
                        onChange={e =>
                          handleInputChange('poNumber', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">{invoice.poNumber || 'N/A'}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium opacity-70">
                      Notes
                    </label>
                    {isEditing ? (
                      <textarea
                        className="textarea textarea-bordered w-full mt-1"
                        value={editedInvoice?.notes || ''}
                        onChange={e =>
                          handleInputChange('notes', e.target.value)
                        }
                      />
                    ) : (
                      <p className="font-medium">
                        {invoice.notes || 'No notes'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Save Changes' : 'Edit Invoice'}
                </button>

                {!isEditing && invoice.status !== 'obsolete' && (
                  <button
                    className="btn btn-error"
                    onClick={handleMarkObsolete}
                  >
                    Mark as Obsolete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Linked Payment Requests */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">
                Linked Payment Requests
              </h2>

              {linkedPaymentRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Request #</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkedPaymentRequests.map(request => (
                        <tr key={request.id}>
                          <td>{request.requestNumber}</td>
                          <td>{formatCurrency(request.amount)}</td>
                          <td>{formatDate(request.date)}</td>
                          <td>
                            <StatusBadge status={request.status} />
                          </td>
                          <td>
                            <Link
                              to={`/payment-requests/${request.id}`}
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
              ) : (
                <div className="alert">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>No payment requests linked to this invoice.</span>
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/payment-requests/create?invoiceId=${invoice.id}`}
                  className="btn btn-primary"
                >
                  Create Payment Request
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Vendor Contact Information */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Vendor Contact</h2>

              <div className="mb-4">
                <label className="text-sm font-medium opacity-70">
                  Contact Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="input input-bordered w-full mt-1"
                    value={editedInvoice?.contactName || ''}
                    onChange={e =>
                      handleInputChange('contactName', e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{invoice.contactName || 'N/A'}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium opacity-70">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="input input-bordered w-full mt-1"
                    value={editedInvoice?.contactEmail || ''}
                    onChange={e =>
                      handleInputChange('contactEmail', e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{invoice.contactEmail || 'N/A'}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium opacity-70">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="input input-bordered w-full mt-1"
                    value={editedInvoice?.contactPhone || ''}
                    onChange={e =>
                      handleInputChange('contactPhone', e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{invoice.contactPhone || 'N/A'}</p>
                )}
              </div>

              {!isEditing && (
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Vendor
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Document Preview */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Document Preview</h2>

              <div className="bg-base-200 rounded-lg p-4 flex flex-col items-center justify-center h-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-base-content opacity-50 mb-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center">Invoice document preview</p>
                <button className="btn btn-sm btn-outline mt-4">
                  View Full Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Action</h3>
            <p className="py-4">
              Are you sure you want to mark this invoice as obsolete? This
              action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={cancelMarkObsolete}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmMarkObsolete}>
                Mark as Obsolete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
