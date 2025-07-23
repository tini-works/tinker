import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
}

export function InvoiceSelectorPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
          date: '2025-07-01',
          dueDate: '2025-07-30',
          status: 'pending',
        },
        {
          id: '2',
          invoiceNumber: 'INV-2025-002',
          vendor: 'Globex Inc',
          amount: 3000.00,
          date: '2025-07-05',
          dueDate: '2025-07-31',
          status: 'pending',
        },
        {
          id: '3',
          invoiceNumber: 'INV-2025-003',
          vendor: 'Initech',
          amount: 2500.50,
          date: '2025-07-10',
          dueDate: '2025-08-10',
          status: 'pending',
        },
        {
          id: '4',
          invoiceNumber: 'INV-2025-004',
          vendor: 'Umbrella Corp',
          amount: 1800.25,
          date: '2025-07-12',
          dueDate: '2025-08-12',
          status: 'pending',
        },
        {
          id: '5',
          invoiceNumber: 'INV-2025-005',
          vendor: 'Wayne Enterprises',
          amount: 3200.00,
          date: '2025-07-15',
          dueDate: '2025-08-15',
          status: 'pending',
        },
      ];
      
      setInvoices(mockInvoices);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Toggle invoice selection
  const toggleInvoiceSelection = (invoiceId: string) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };
  
  // Handle create payment request
  const handleCreatePaymentRequest = () => {
    if (selectedInvoices.length === 0) {
      alert('Please select at least one invoice');
      return;
    }
    
    // In a real app, you would pass the selected invoice IDs to the create page
    // For now, we'll just navigate to the create page
    navigate('/payment-requests/create');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Select Invoices</h1>
        <div className="flex gap-2">
          <Link to="/invoices" className="btn btn-outline">
            Cancel
          </Link>
          <button 
            className="btn btn-primary"
            onClick={handleCreatePaymentRequest}
            disabled={selectedInvoices.length === 0}
          >
            Create Payment Request ({selectedInvoices.length})
          </button>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Invoice #</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => toggleInvoiceSelection(invoice.id)}
                      />
                    </td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.vendor}</td>
                    <td>{formatCurrency(invoice.amount)}</td>
                    <td>{formatDate(invoice.date)}</td>
                    <td>{formatDate(invoice.dueDate)}</td>
                    <td>
                      <div className="badge badge-primary">
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-base-content/70">
              {selectedInvoices.length} of {invoices.length} invoices selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

