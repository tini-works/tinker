import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceStatus, formatCurrency, formatDate } from '@invoice-approval/shared';
import InvoiceCard from '@components/InvoiceCard';

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from the backend API
    const fetchInvoices = async () => {
      try {
        // Simulating API call with mock data
        const mockInvoices: Invoice[] = [
          {
            id: '1',
            invoiceNumber: 'INV-001',
            vendorName: 'Acme Corp',
            amount: 1500.00,
            currency: 'USD',
            issueDate: '2023-01-15',
            dueDate: '2023-02-15',
            status: InvoiceStatus.PAID,
            description: 'Office supplies'
          },
          {
            id: '2',
            invoiceNumber: 'INV-002',
            vendorName: 'Globex Inc',
            amount: 3200.50,
            currency: 'USD',
            issueDate: '2023-02-01',
            dueDate: '2023-03-01',
            status: InvoiceStatus.PENDING,
            description: 'Consulting services'
          },
          {
            id: '3',
            invoiceNumber: 'INV-003',
            vendorName: 'Initech',
            amount: 950.75,
            currency: 'USD',
            issueDate: '2023-02-10',
            dueDate: '2023-03-10',
            status: InvoiceStatus.APPROVED,
            description: 'Software licenses'
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setInvoices(mockInvoices);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch invoices');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleInvoiceClick = (invoice: Invoice) => {
    console.log('Invoice clicked:', invoice);
    // In a real app, this would navigate to invoice details page
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading invoices...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      
      <div className="mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Invoices</div>
            <div className="stat-value">{invoices.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Amount</div>
            <div className="stat-value">
              {formatCurrency(
                invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
                'USD'
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map(invoice => (
          <InvoiceCard 
            key={invoice.id} 
            invoice={invoice} 
            onClick={handleInvoiceClick}
          />
        ))}
      </div>

      {invoices.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No invoices found
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;

