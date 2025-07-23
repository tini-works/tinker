import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Mock payment request data
interface PaymentRequest {
  id: string;
  title: string;
  description: string;
  totalAmount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  paymentMethod: string;
  invoiceCount: number;
  createdAt: string;
}

export function PaymentRequestListPage() {
  const [searchParams] = useSearchParams();
  const successMessage = searchParams.get('success');
  
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Load payment requests
  useEffect(() => {
    // Simulate API call to fetch payment requests
    setTimeout(() => {
      // Mock payment request data
      const mockPaymentRequests: PaymentRequest[] = [
        {
          id: '1',
          title: 'Q3 Office Supplies',
          description: 'Payment for quarterly office supplies',
          totalAmount: 3450.75,
          dueDate: '2025-08-15',
          status: 'pending',
          paymentMethod: 'bank_transfer',
          invoiceCount: 3,
          createdAt: '2025-07-20T10:30:00Z',
        },
        {
          id: '2',
          title: 'IT Equipment',
          description: 'New laptops and monitors',
          totalAmount: 12750.00,
          dueDate: '2025-08-10',
          status: 'approved',
          paymentMethod: 'check',
          invoiceCount: 2,
          createdAt: '2025-07-18T14:15:00Z',
        },
        {
          id: '3',
          title: 'Marketing Services',
          description: 'Q3 marketing campaign services',
          totalAmount: 8500.00,
          dueDate: '2025-08-05',
          status: 'paid',
          paymentMethod: 'bank_transfer',
          invoiceCount: 1,
          createdAt: '2025-07-15T09:45:00Z',
        },
        {
          id: '4',
          title: 'Consulting Services',
          description: 'Strategic consulting for Q3',
          totalAmount: 15000.00,
          dueDate: '2025-08-20',
          status: 'pending',
          paymentMethod: 'credit_card',
          invoiceCount: 1,
          createdAt: '2025-07-22T11:20:00Z',
        },
        {
          id: '5',
          title: 'Office Rent',
          description: 'August office rent payment',
          totalAmount: 7500.00,
          dueDate: '2025-07-31',
          status: 'approved',
          paymentMethod: 'bank_transfer',
          invoiceCount: 1,
          createdAt: '2025-07-21T16:30:00Z',
        },
      ];
      
      setPaymentRequests(mockPaymentRequests);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter payment requests based on search query and status filter
  const filteredPaymentRequests = paymentRequests.filter(pr => {
    const matchesSearch = 
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'approved':
        return 'badge-success';
      case 'rejected':
        return 'badge-error';
      case 'paid':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };
  
  // Get payment method display text
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'check':
        return 'Check';
      case 'credit_card':
        return 'Credit Card';
      case 'cash':
        return 'Cash';
      default:
        return method;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Payment Requests</h1>
        <Link to="/payment-requests/create" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Payment Request
        </Link>
      </div>
      
      {successMessage === 'created' && (
        <div className="alert alert-success mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Payment request created successfully!</span>
        </div>
      )}
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search payment requests..."
                  className="input input-bordered w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="form-control md:w-64">
              <select
                className="select select-bordered w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          
          {filteredPaymentRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th className="hidden md:table-cell">Due Date</th>
                    <th>Status</th>
                    <th className="hidden md:table-cell">Payment Method</th>
                    <th className="hidden md:table-cell">Invoices</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaymentRequests.map((pr) => (
                    <tr key={pr.id}>
                      <td>
                        <div className="font-bold">{pr.title}</div>
                        <div className="text-sm opacity-70 hidden md:block">{pr.description}</div>
                      </td>
                      <td className="font-medium">{formatCurrency(pr.totalAmount)}</td>
                      <td className="hidden md:table-cell">{formatDate(pr.dueDate)}</td>
                      <td>
                        <div className={`badge ${getStatusBadgeClass(pr.status)}`}>
                          {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                        </div>
                      </td>
                      <td className="hidden md:table-cell">{getPaymentMethodText(pr.paymentMethod)}</td>
                      <td className="hidden md:table-cell">{pr.invoiceCount}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-circle btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-sm btn-circle btn-ghost">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li><a>Edit</a></li>
                              <li><a>Delete</a></li>
                              {pr.status === 'pending' && <li><a>Approve</a></li>}
                              {pr.status === 'approved' && <li><a>Mark as Paid</a></li>}
                            </ul>
                          </div>
                        </div>
                      </td>
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
              <span>No payment requests found matching your criteria.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

