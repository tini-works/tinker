import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Mock payment request data
interface PaymentRequest {
  id: string;
  requestNumber: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'draft' | 'pending' | 'approved' | 'completed' | 'rejected';
  vendor: string;
  invoiceNumber?: string;
  approver?: string;
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

export function PaymentRequestListPage() {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof PaymentRequest>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;
  
  useEffect(() => {
    // Simulate API call to fetch payment requests
    setTimeout(() => {
      // Mock payment request data
      const mockPaymentRequests: PaymentRequest[] = [
        {
          id: '1',
          requestNumber: 'PR-2025-001',
          amount: 1250.75,
          date: '2025-07-15',
          dueDate: '2025-07-30',
          status: 'pending',
          vendor: 'Acme Corporation',
          invoiceNumber: 'INV-2025-101',
          approver: 'Jane Smith',
        },
        {
          id: '2',
          requestNumber: 'PR-2025-002',
          amount: 3450.00,
          date: '2025-07-16',
          dueDate: '2025-07-31',
          status: 'approved',
          vendor: 'Globex Inc',
          invoiceNumber: 'INV-2025-102',
          approver: 'John Doe',
        },
        {
          id: '3',
          requestNumber: 'PR-2025-003',
          amount: 875.50,
          date: '2025-07-18',
          dueDate: '2025-08-02',
          status: 'completed',
          vendor: 'Initech',
          invoiceNumber: 'INV-2025-103',
          approver: 'Jane Smith',
        },
        {
          id: '4',
          requestNumber: 'PR-2025-004',
          amount: 2100.25,
          date: '2025-07-20',
          dueDate: '2025-08-04',
          status: 'rejected',
          vendor: 'Umbrella Corp',
          invoiceNumber: 'INV-2025-104',
          approver: 'John Doe',
        },
        {
          id: '5',
          requestNumber: 'PR-2025-005',
          amount: 5600.00,
          date: '2025-07-22',
          dueDate: '2025-08-06',
          status: 'draft',
          vendor: 'Wayne Enterprises',
          invoiceNumber: 'INV-2025-105',
        },
        {
          id: '6',
          requestNumber: 'PR-2025-006',
          amount: 950.25,
          date: '2025-07-23',
          dueDate: '2025-08-07',
          status: 'pending',
          vendor: 'Stark Industries',
          invoiceNumber: 'INV-2025-106',
          approver: 'Jane Smith',
        },
        {
          id: '7',
          requestNumber: 'PR-2025-007',
          amount: 1800.00,
          date: '2025-07-24',
          dueDate: '2025-08-08',
          status: 'approved',
          vendor: 'Oscorp',
          invoiceNumber: 'INV-2025-107',
          approver: 'John Doe',
        },
        {
          id: '8',
          requestNumber: 'PR-2025-008',
          amount: 3200.50,
          date: '2025-07-25',
          dueDate: '2025-08-09',
          status: 'pending',
          vendor: 'LexCorp',
          invoiceNumber: 'INV-2025-108',
          approver: 'Jane Smith',
        },
        {
          id: '9',
          requestNumber: 'PR-2025-009',
          amount: 4500.75,
          date: '2025-07-26',
          dueDate: '2025-08-10',
          status: 'completed',
          vendor: 'Cyberdyne Systems',
          invoiceNumber: 'INV-2025-109',
          approver: 'John Doe',
        },
        {
          id: '10',
          requestNumber: 'PR-2025-010',
          amount: 1100.00,
          date: '2025-07-27',
          dueDate: '2025-08-11',
          status: 'draft',
          vendor: 'Massive Dynamic',
          invoiceNumber: 'INV-2025-110',
        },
        {
          id: '11',
          requestNumber: 'PR-2025-011',
          amount: 2750.25,
          date: '2025-07-28',
          dueDate: '2025-08-12',
          status: 'pending',
          vendor: 'Soylent Corp',
          invoiceNumber: 'INV-2025-111',
          approver: 'Jane Smith',
        },
        {
          id: '12',
          requestNumber: 'PR-2025-012',
          amount: 3900.50,
          date: '2025-07-29',
          dueDate: '2025-08-13',
          status: 'rejected',
          vendor: 'Weyland-Yutani',
          invoiceNumber: 'INV-2025-112',
          approver: 'John Doe',
        },
      ];
      
      setPaymentRequests(mockPaymentRequests);
      setFilteredRequests(mockPaymentRequests);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter and sort payment requests
  useEffect(() => {
    let result = [...paymentRequests];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(request => 
        request.requestNumber.toLowerCase().includes(query) ||
        request.vendor.toLowerCase().includes(query) ||
        (request.invoiceNumber && request.invoiceNumber.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      }
      
      return 0;
    });
    
    setFilteredRequests(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [paymentRequests, statusFilter, searchQuery, sortField, sortDirection]);
  
  // Handle sort toggle
  const handleSort = (field: keyof PaymentRequest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get current page data
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Render sort indicator
  const renderSortIndicator = (field: keyof PaymentRequest) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
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
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by request #, vendor, or invoice #"
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
            
            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('requestNumber')}
                  >
                    Request # {renderSortIndicator('requestNumber')}
                  </th>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('vendor')}
                  >
                    Vendor {renderSortIndicator('vendor')}
                  </th>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {renderSortIndicator('amount')}
                  </th>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {renderSortIndicator('date')}
                  </th>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('dueDate')}
                  >
                    Due Date {renderSortIndicator('dueDate')}
                  </th>
                  <th 
                    className="cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status {renderSortIndicator('status')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.length > 0 ? (
                  currentRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.requestNumber}</td>
                      <td>{request.vendor}</td>
                      <td>{formatCurrency(request.amount)}</td>
                      <td>{formatDate(request.date)}</td>
                      <td>{formatDate(request.dueDate)}</td>
                      <td>
                        <StatusBadge status={request.status} />
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link to={`/payment-requests/${request.id}`} className="btn btn-sm btn-outline">
                            View
                          </Link>
                          {request.status === 'draft' && (
                            <Link to={`/payment-requests/${request.id}/edit`} className="btn btn-sm btn-outline">
                              Edit
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No payment requests found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  className="join-item btn"
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
          
          {/* Summary */}
          <div className="text-sm text-base-content/70 mt-4">
            Showing {indexOfFirstRequest + 1}-{Math.min(indexOfLastRequest, filteredRequests.length)} of {filteredRequests.length} payment requests
          </div>
        </div>
      </div>
    </div>
  );
}

