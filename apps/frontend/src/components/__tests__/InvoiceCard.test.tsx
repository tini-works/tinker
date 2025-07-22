import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Invoice, InvoiceStatus } from '@invoice-approval/shared';
import InvoiceCard from '../InvoiceCard';

const mockInvoice: Invoice = {
  id: '1',
  invoiceNumber: 'INV-001',
  vendorName: 'Test Corp',
  amount: 1500.00,
  currency: 'USD',
  issueDate: '2023-01-15',
  dueDate: '2023-02-15',
  status: InvoiceStatus.PENDING,
  description: 'Test supplies'
};

describe('InvoiceCard', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders invoice details correctly', () => {
    render(<InvoiceCard invoice={mockInvoice} onClick={mockOnClick} />);
    
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<InvoiceCard invoice={mockInvoice} onClick={mockOnClick} />);
    
    const card = screen.getByRole('article');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockInvoice);
  });

  it('displays different status colors based on invoice status', () => {
    const paidInvoice = { ...mockInvoice, status: InvoiceStatus.PAID };
    const { rerender } = render(<InvoiceCard invoice={paidInvoice} onClick={mockOnClick} />);
    
    let statusBadge = screen.getByText('PAID');
    expect(statusBadge).toHaveClass('badge-success');
    
    const pendingInvoice = { ...mockInvoice, status: InvoiceStatus.PENDING };
    rerender(<InvoiceCard invoice={pendingInvoice} onClick={mockOnClick} />);
    
    statusBadge = screen.getByText('PENDING');
    expect(statusBadge).toHaveClass('badge-warning');
    
    const rejectedInvoice = { ...mockInvoice, status: InvoiceStatus.REJECTED };
    rerender(<InvoiceCard invoice={rejectedInvoice} onClick={mockOnClick} />);
    
    statusBadge = screen.getByText('REJECTED');
    expect(statusBadge).toHaveClass('badge-error');
  });
});

