import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Mock payment request data
interface PaymentRequest {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: string;
  invoiceCount: number;
}

export function PaymentRequestListPage() {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load payment requests
  useEffect(() => {
    // Simulate API call to fetch payment requests
    setTimeout(() => {
      // Mock payment request data
      const mockPaymentRequests: PaymentRequest[] = [
        {
          id: '1',
          title: 'July Office Supplies',
          amount: 4700.75,
          dueDate: '2025-07-30',
          status: 'pending',
          invoiceCount: 3
        },
        {
          id: '2',
          title: 'Q3 Equipment Purchases',
          amount: 12500.00,
          dueDate: '2025-08-15',
          status: 'approved',
          invoiceCount: 5
        },
        {
          id: '3',
          title: 'Marketing Services',
          amount: 8750.50,
          dueDate: '2025-08-05',
          status: 'pending',
          invoiceCount: 2
        },
        {
          id: '4',
          title: 'IT Infrastructure',
          amount: 15200.25,
          dueDate: '2025-08-20',
          status: 'paid',
          invoiceCount: 4
        },
        {
          id: '5',
          title: 'Consulting Services',
          amount: 6500.00,
          dueDate: '2025-07-25',
          status: 'pending',
          invoiceCount: 1
        }
      ];
      
      setPaymentRequests(mockPaymentRequests);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Requests</h1>
        <Link to="/payment-requests/create" className="btn btn-primary">
          Create Payment Request
        </Link>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Invoices</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentRequests.length > 0 ? (
                  paymentRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.title}</td>
                      <td>{formatCurrency(request.amount)}</td>
                      <td>{formatDate(request.dueDate)}</td>
                      <td>
                        <div className={`badge ${
                          request.status === 'pending' ? 'badge-primary' :
                          request.status === 'approved' ? 'badge-secondary' :
                          request.status === 'paid' ? 'badge-success' : 'badge-ghost'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </td>
                      <td>{request.invoiceCount}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button className="btn btn-sm btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No payment requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

