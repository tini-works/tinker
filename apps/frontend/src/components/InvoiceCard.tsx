import React from 'react';
import { Invoice, InvoiceStatus, formatCurrency, formatDate } from '@invoice-approval/shared';

interface InvoiceCardProps {
  invoice: Invoice;
  onClick: (invoice: Invoice) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onClick }) => {
  const getStatusBadgeClass = (status: InvoiceStatus): string => {
    switch (status) {
      case InvoiceStatus.PAID:
        return 'badge-success';
      case InvoiceStatus.APPROVED:
        return 'badge-info';
      case InvoiceStatus.PENDING:
        return 'badge-warning';
      case InvoiceStatus.REJECTED:
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <article 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => onClick(invoice)}
    >
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{invoice.invoiceNumber}</h2>
          <span className={`badge ${getStatusBadgeClass(invoice.status)}`}>
            {invoice.status}
          </span>
        </div>
        
        <p className="text-lg font-semibold">{invoice.vendorName}</p>
        
        <div className="mt-2">
          <p className="text-2xl font-bold">
            {formatCurrency(invoice.amount, invoice.currency)}
          </p>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Issue: {formatDate(invoice.issueDate)}</span>
            <span>Due: {formatDate(invoice.dueDate)}</span>
          </div>
        </div>
        
        {invoice.description && (
          <p className="mt-2 text-gray-600">{invoice.description}</p>
        )}
        
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary">View Details</button>
        </div>
      </div>
    </article>
  );
};

export default InvoiceCard;

