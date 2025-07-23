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
  dueDate: string;
  status: string;
  selected: boolean;
}

export function InvoiceSelectorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/payment-requests/create';
  const preSelectedIds = searchParams.get('selected')?.split(',') || [];
  
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Invoice>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;
  
  // Load invoices
  useEffect(() => {
    // Simulate API call to fetch invoices
    setTimeout(() => {
      // Mock invoice data
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          invoiceNumber: 'INV-2025-001',
          vendor: 'Acme Corporation',
          amount: 1250.75,
          date: '2025-07-15',
          dueDate: '2025-07-30',
          status: 'pending',
          selected: preSelectedIds.includes('1'),
        },
        {
          id: '2',
          invoiceNumber: 'INV-2025-002',
          vendor: 'Globex Inc',
          amount: 3450.00,
          date: '2025-07-16',
          dueDate: '2025-07-31',
          status: 'pending',
          selected: preSelectedIds.includes('2'),
        },
        {
          id: '3',
          invoiceNumber: 'INV-2025-003',
          vendor: 'Initech',
          amount: 875.50,
          date: '2025-07-18',
          dueDate: '2025-08-02',
          status: 'pending',
          selected: preSelectedIds.includes('3'),
        },
        {
          id: '4',
          invoiceNumber: 'INV-2025-004',
          vendor: 'Umbrella Corp',
          amount: 2100.25,
          date: '2025-07-20',
          dueDate: '2025-08-04',
          status: 'pending',
          selected: preSelectedIds.includes('4'),
        },
        {
          id: '5',
          invoiceNumber: 'INV-2025-005',
          vendor: 'Wayne Enterprises',
          amount: 5600.00,
          date: '2025-07-22',
          dueDate: '2025-08-06',
          status: 'pending',
          selected: preSelectedIds.includes('5'),
        },
        {
          id: '6',
          invoiceNumber: 'INV-2025-006',
          vendor: 'Stark Industries',
          amount: 950.25,
          date: '2025-07-23',
          dueDate: '2025-08-07',
          status: 'pending',
          selected: preSelectedIds.includes('6'),
        },
        {
          id: '7',
          invoiceNumber: 'INV-2025-007',
          vendor: 'Oscorp',
          amount: 1800.00,
          date: '2025-07-24',
          dueDate: '2025-08-08',
          status: 'pending',
          selected: preSelectedIds.includes('7'),
        },
        {
          id: '8',
          invoiceNumber: 'INV-2025-008',
          vendor: 'LexCorp',
          amount: 3200.50,
          date: '2025-07-25',
          dueDate: '2025-08-09',
          status: 'pending',
          selected: preSelectedIds.includes('8'),
        },
        {
          id: '9',
          invoiceNumber: 'INV-2025-009',
          vendor: 'Cyberdyne Systems',
          amount: 4500.75,
          date: '2025-07-26',
          dueDate: '2025-08-10',
          status: 'pending',
          selected: preSelectedIds.includes('9'),
        },
        {
          id: '10',
          invoiceNumber: 'INV-2025-010',
          vendor: 'Massive Dynamic',
          amount: 1100.00,
          date: '2025-07-27',
          dueDate: '2025-08-11',
          status: 'pending',
          selected: preSelectedIds.includes('10'),
        },
        {
          id: '11',
          invoiceNumber: 'INV-2025-011',
          vendor: 'Soylent Corp',
          amount: 2750.25,
          date: '2025-07-28',
          dueDate: '2025-08-12',
          status: 'pending',
          selected: preSelectedIds.includes('11'),
        },
        {
          id: '12',
          invoiceNumber: 'INV-2025-012',
          vendor: 'Weyland-Yutani',
          amount: 3900.50,
          date: '2025-07-29',
          dueDate: '2025-08-13',
          status: 'pending',
          selected: preSelectedIds.includes('12'),
        },
        {
          id: '13',
          invoiceNumber: 'INV-2025-013',
          vendor: 'Acme Corporation',
          amount: 2200.00,
          date: '2025-07-30',
          dueDate: '2025-08-14',
          status: 'approved',
          selected: preSelectedIds.includes('13'),
        },
        {
          id: '14',
          invoiceNumber: 'INV-2025-014',
          vendor: 'Globex Inc',
          amount: 1750.50,
          date: '2025-07-31',
          dueDate: '2025-08-15',
          status: 'approved',
          selected: preSelectedIds.includes('14'),
        },
        {
          id: '15',
          invoiceNumber: 'INV-2025-015',
          vendor: 'Initech',
          amount: 3300.25,
          date: '2025-08-01',
          dueDate: '2025-08-16',
          status: 'approved',
          selected: preSelectedIds.includes('15'),
        },
      ];
      
      setInvoices(mockInvoices);
      setFilteredInvoices(mockInvoices);
      setIsLoading(false);
    }, 1000);
  }, [preSelectedIds]);
  
  // Get unique vendors for filter dropdown
  const uniqueVendors = [...new Set(invoices.map(invoice => invoice.vendor))];
  
  // Filter and sort invoices
  useEffect(() => {
    let result = [...invoices];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }
    
    // Apply vendor filter
    if (vendorFilter !== 'all') {
      result = result.filter(invoice => invoice.vendor === vendorFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.vendor.toLowerCase().includes(query)
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
    
    setFilteredInvoices(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [invoices, statusFilter, vendorFilter, searchQuery, sortField, sortDirection]);
  
  // Handle sort toggle
  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Toggle invoice selection
  const handleToggleSelect = (id: string) => {
    const updatedInvoices = invoices.map(invoice => 
      invoice.id === id 
        ? { ...invoice, selected: !invoice.selected } 
        : invoice
    );
    setInvoices(updatedInvoices);
  };
  
  // Toggle select all invoices on current page
  const handleToggleSelectAll = () => {
    const currentPageInvoices = getCurrentPageInvoices();
    const allSelected = currentPageInvoices.every(invoice => invoice.selected);
    
    const updatedInvoices = invoices.map(invoice => {
      const isOnCurrentPage = currentPageInvoices.some(i => i.id === invoice.id);
      return isOnCurrentPage ? { ...invoice, selected: !allSelected } : invoice;
    });
    
    setInvoices(updatedInvoices);
  };
  
  // Get selected invoices
  const selectedInvoices = invoices.filter(invoice => invoice.selected);
  
  // Calculate total amount of selected invoices
  const totalSelectedAmount = selectedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Get current page data
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const getCurrentPageInvoices = () => {
    return filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  };
  const currentInvoices = getCurrentPageInvoices();
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle confirm selection
  const handleConfirmSelection = () => {
    const selectedIds = selectedInvoices.map(invoice => invoice.id).join(',');
    navigate(`${returnUrl}?selected=${selectedIds}`);
  };
  
  // Render sort indicator
  const renderSortIndicator = (field: keyof Invoice) => {
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
      <div className="flex items-center mb-6">
        <Link to={returnUrl} className="btn btn-ghost btn-sm mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Select Invoices</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="form-control flex-1">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search by invoice # or vendor"
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                </select>
                
                <select
                  className="select select-bordered"
                  value={vendorFilter}
                  onChange={(e) => setVendorFilter(e.target.value)}
                >
                  <option value="all">All Vendors</option>
                  {uniqueVendors.map((vendor, index) => (
                    <option key={index} value={vendor}>{vendor}</option>
                  ))}
                </select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={currentInvoices.length > 0 && currentInvoices.every(invoice => invoice.selected)}
                          onChange={handleToggleSelectAll}
                        />
                      </th>
                      <th 
                        className="cursor-pointer"
                        onClick={() => handleSort('invoiceNumber')}
                      >
                        Invoice # {renderSortIndicator('invoiceNumber')}
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
                    </tr>
                  </thead>
                  <tbody>
                    {currentInvoices.length > 0 ? (
                      currentInvoices.map((invoice) => (
                        <tr 
                          key={invoice.id} 
                          className={invoice.selected ? 'bg-base-200' : ''}
                          onClick={() => handleToggleSelect(invoice.id)}
                        >
                          <td>
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={invoice.selected}
                              onChange={() => handleToggleSelect(invoice.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                          <td>{invoice.invoiceNumber}</td>
                          <td>{invoice.vendor}</td>
                          <td>{formatCurrency(invoice.amount)}</td>
                          <td>{formatDate(invoice.date)}</td>
                          <td>{formatDate(invoice.dueDate)}</td>
                          <td>
                            <div className={`badge ${
                              invoice.status === 'pending' ? 'badge-primary' :
                              invoice.status === 'approved' ? 'badge-secondary' :
                              invoice.status === 'paid' ? 'badge-success' : 'badge-ghost'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No invoices found matching your criteria.
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
                Showing {indexOfFirstInvoice + 1}-{Math.min(indexOfLastInvoice, filteredInvoices.length)} of {filteredInvoices.length} invoices
              </div>
            </div>
          </div>
        </div>
        
        {/* Selection Summary */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Selected Invoices</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-70">Count</div>
                  <div className="text-xl font-bold">{selectedInvoices.length}</div>
                </div>
                
                <div>
                  <div className="text-sm opacity-70">Total Amount</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalSelectedAmount)}</div>
                </div>
                
                {selectedInvoices.length > 0 && (
                  <>
                    <div className="divider"></div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {selectedInvoices.map((invoice) => (
                        <div key={invoice.id} className="flex justify-between items-center mb-2">
                          <div className="text-sm">
                            <div>{invoice.invoiceNumber}</div>
                            <div className="opacity-70">{invoice.vendor}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                            <button
                              className="btn btn-xs btn-ghost btn-circle"
                              onClick={() => handleToggleSelect(invoice.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="pt-4">
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleConfirmSelection}
                    disabled={selectedInvoices.length === 0}
                  >
                    Confirm Selection
                  </button>
                  
                  <Link to={returnUrl} className="btn btn-outline w-full mt-2">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

