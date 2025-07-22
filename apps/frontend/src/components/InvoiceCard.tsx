import React from 'react';
import { Invoice, formatCurrency, formatDate, isOverdue } from '@invoice-approval/shared';

interface InvoiceCardProps {
  invoice: Invoice;
  onClick?: (invoice: Invoice) => void;
}

/**
 * InvoiceCard component displays an invoice in a card format
 */
const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(invoice);
    }
  };

  const isInvoiceOverdue = isOverdue(invoice.dueDate);

  return (
    <div 
      className={`card p-4 border rounded-lg shadow-sm ${isInvoiceOverdue ? 'border-red-300' : 'border-gray-200'}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
          <p className="text-gray-600">{invoice.vendorName}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{formatCurrency(invoice.amount, invoice.currency)}</p>
          <p className={`text-sm ${isInvoiceOverdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
            Due: {formatDate(invoice.dueDate)}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
          {invoice.status}
        </span>
        <span className="text-sm text-gray-500">
          Issued: {formatDate(invoice.issueDate)}
        </span>
      </div>
      {invoice.description && (
        <p className="mt-2 text-sm text-gray-600 truncate">{invoice.description}</p>
      )}
    </div>
  );
};

/**
 * Get the color class for an invoice status
 */
function getStatusColor(status: string): string {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800';
    case 'PENDING':
      return 'bg-blue-100 text-blue-800';
    case 'APPROVED':
      return 'bg-green-100 text-green-800';
    case 'REJECTED':
      return 'bg-red-100 text-red-800';
    case 'PAID':
      return 'bg-purple-100 text-purple-800';
    case 'CANCELLED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default InvoiceCard;

