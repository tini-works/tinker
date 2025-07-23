import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../utils/formatters';

// Mock invoice data
interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  amount: number;
  date: string;
  status: string;
}

// Payment request form data
interface PaymentRequestForm {
  title: string;
  description: string;
  dueDate: string;
  paymentMethod: string;
  accountNumber: string;
  notes: string;
  selectedInvoiceIds: string[];
}

export function CreatePaymentRequestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedInvoiceIds = searchParams.get('selected')?.split(',') || [];
  
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<PaymentRequestForm>({
    title: '',
    description: '',
    dueDate: '',
    paymentMethod: 'bank_transfer',
    accountNumber: '',
    notes: '',
    selectedInvoiceIds: selectedInvoiceIds,
  });
  
  useEffect(() => {
    if (selectedInvoiceIds.length > 0) {
      // Simulate API call to fetch selected invoices
      setTimeout(() => {
        // Mock selected invoices data based on IDs
        const mockSelectedInvoices: Invoice[] = selectedInvoiceIds.map(id => ({
          id,
          invoiceNumber: `INV-2025-${id.padStart(3, '0')}`,
          vendor: ['Acme Corporation', 'Globex Inc', 'Initech', 'Umbrella Corp', 'Wayne Enterprises'][Number(id) % 5],
          amount: 1000 + (Number(id) * 500),
          date: `2025-07-${15 + Number(id)}`,
          status: 'pending',
        }));
        
        setSelectedInvoices(mockSelectedInvoices);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [selectedInvoiceIds]);
  
  // Calculate total amount
  const totalAmount = selectedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link to="/payment-requests" className="btn btn-ghost btn-sm mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Create Payment Request</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Payment Request Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter payment request title"
                    />
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Due Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                
                <div className="form-control w-full mt-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter payment request description"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            {/* Invoice Selection */}
            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title text-xl">Selected Invoices</h2>
                  <Link
                    to={`/invoices/selector?returnUrl=${encodeURIComponent('/payment-requests/create')}${selectedInvoiceIds.length > 0 ? `&selected=${selectedInvoiceIds.join(',')}` : ''}`}
                    className="btn btn-primary btn-sm"
                  >
                    Select Invoices
                  </Link>
                </div>
                
                {selectedInvoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Invoice #</th>
                          <th>Vendor</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.vendor}</td>
                            <td>{formatCurrency(invoice.amount)}</td>
                            <td>{formatDate(invoice.date)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>No invoices selected. Click "Select Invoices" to add invoices to this payment request.</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Link to="/payment-requests" className="btn btn-outline">
                Cancel
              </Link>
              <button
                type="button"
                className="btn btn-primary"
              >
                Create Payment Request
              </button>
            </div>
          </form>
        </div>
        
        {/* Summary Sidebar */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-70">Selected Invoices</div>
                  <div className="text-xl font-bold">{selectedInvoices.length}</div>
                </div>
                
                <div>
                  <div className="text-sm opacity-70">Total Amount</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

