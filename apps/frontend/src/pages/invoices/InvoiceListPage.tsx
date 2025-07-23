import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Mock data for invoices
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    vendor: 'Acme Corp',
    amount: 1250.75,
    date: '2025-06-15',
    dueDate: '2025-07-15',
    status: 'pending',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    vendor: 'Globex Inc',
    amount: 3450.0,
    date: '2025-06-18',
    dueDate: '2025-07-18',
    status: 'linked',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    vendor: 'Initech',
    amount: 875.5,
    date: '2025-06-20',
    dueDate: '2025-07-20',
    status: 'completed',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    vendor: 'Umbrella Corp',
    amount: 2100.25,
    date: '2025-06-22',
    dueDate: '2025-07-22',
    status: 'pending',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2025-005',
    vendor: 'Wayne Enterprises',
    amount: 5600.0,
    date: '2025-06-25',
    dueDate: '2025-07-25',
    status: 'obsolete',
  },
  {
    id: '6',
    invoiceNumber: 'INV-2025-006',
    vendor: 'Stark Industries',
    amount: 4250.75,
    date: '2025-06-28',
    dueDate: '2025-07-28',
    status: 'pending',
  },
  {
    id: '7',
    invoiceNumber: 'INV-2025-007',
    vendor: 'Cyberdyne Systems',
    amount: 1800.5,
    date: '2025-06-30',
    dueDate: '2025-07-30',
    status: 'linked',
  },
  {
    id: '8',
    invoiceNumber: 'INV-2025-008',
    vendor: 'Oscorp',
    amount: 3200.25,
    date: '2025-07-02',
    dueDate: '2025-08-02',
    status: 'completed',
  },
  {
    id: '9',
    invoiceNumber: 'INV-2025-009',
    vendor: 'LexCorp',
    amount: 950.0,
    date: '2025-07-05',
    dueDate: '2025-08-05',
    status: 'pending',
  },
  {
    id: '10',
    invoiceNumber: 'INV-2025-010',
    vendor: 'Massive Dynamic',
    amount: 7500.5,
    date: '2025-07-08',
    dueDate: '2025-08-08',
    status: 'linked',
  },
  {
    id: '11',
    invoiceNumber: 'INV-2025-011',
    vendor: 'Soylent Corp',
    amount: 1250.25,
    date: '2025-07-10',
    dueDate: '2025-08-10',
    status: 'pending',
  },
  {
    id: '12',
    invoiceNumber: 'INV-2025-012',
    vendor: 'Weyland-Yutani',
    amount: 4800.0,
    date: '2025-07-12',
    dueDate: '2025-08-12',
    status: 'obsolete',
  },
];

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

export function InvoiceListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter invoices based on search term and status
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'invoiceNumber':
        comparison = a.invoiceNumber.localeCompare(b.invoiceNumber);
        break;
      case 'vendor':
        comparison = a.vendor.localeCompare(b.vendor);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'dueDate':
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginate invoices
  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = sortedInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle sort change
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Invoices</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/invoices/import" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Import Invoices
          </Link>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="linked">Linked</option>
              <option value="completed">Completed</option>
              <option value="obsolete">Obsolete</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th
                    className="cursor-pointer"
                    onClick={() => handleSort('invoiceNumber')}
                  >
                    <div className="flex items-center">
                      Invoice #
                      {sortField === 'invoiceNumber' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer"
                    onClick={() => handleSort('vendor')}
                  >
                    <div className="flex items-center">
                      Vendor
                      {sortField === 'vendor' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === 'amount' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === 'date' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer"
                    onClick={() => handleSort('dueDate')}
                  >
                    <div className="flex items-center">
                      Due Date
                      {sortField === 'dueDate' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.vendor}</td>
                      <td>{formatCurrency(invoice.amount)}</td>
                      <td>{formatDate(invoice.date)}</td>
                      <td>{formatDate(invoice.dueDate)}</td>
                      <td>
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            to={`/invoices/${invoice.id}`}
                            className="btn btn-sm btn-outline"
                          >
                            View
                          </Link>
                          {invoice.status !== 'obsolete' && (
                            <button className="btn btn-sm btn-outline btn-error">
                              Mark Obsolete
                            </button>
                          )}
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

          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, sortedInvoices.length)} of{' '}
              {sortedInvoices.length} invoices
            </div>

            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              {paginationButtons}
              <button
                className="join-item btn"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
