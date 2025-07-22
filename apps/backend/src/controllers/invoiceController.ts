import { Request, Response } from 'express';
import { Invoice, InvoiceStatus } from '@invoice-approval/shared';

/**
 * Get all invoices
 * @param req Express request object
 * @param res Express response object
 */
export const getAllInvoices = async (req: Request, res: Response): Promise<void> => {
  try {
    // In a real application, this would fetch from a database
    const invoices: Invoice[] = [
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
      }
    ];

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};

/**
 * Get invoice by ID
 * @param req Express request object
 * @param res Express response object
 */
export const getInvoiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // In a real application, this would fetch from a database
    const invoice: Invoice = {
      id,
      invoiceNumber: `INV-${id}`,
      vendorName: 'Acme Corp',
      amount: 1500.00,
      currency: 'USD',
      issueDate: '2023-01-15',
      dueDate: '2023-02-15',
      status: InvoiceStatus.PAID,
      description: 'Office supplies'
    };

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error });
  }
};

/**
 * Create a new invoice
 * @param req Express request object
 * @param res Express response object
 */
export const createInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoiceData: Omit<Invoice, 'id'> = req.body;
    
    // In a real application, this would save to a database
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substring(2, 15),
      ...invoiceData
    };

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice', error });
  }
};

/**
 * Update an existing invoice
 * @param req Express request object
 * @param res Express response object
 */
export const updateInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const invoiceData: Partial<Invoice> = req.body;
    
    // In a real application, this would update in a database
    const updatedInvoice: Invoice = {
      id,
      invoiceNumber: invoiceData.invoiceNumber || `INV-${id}`,
      vendorName: invoiceData.vendorName || 'Acme Corp',
      amount: invoiceData.amount || 1500.00,
      currency: invoiceData.currency || 'USD',
      issueDate: invoiceData.issueDate || '2023-01-15',
      dueDate: invoiceData.dueDate || '2023-02-15',
      status: invoiceData.status || InvoiceStatus.PAID,
      description: invoiceData.description || 'Office supplies'
    };

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice', error });
  }
};

/**
 * Delete an invoice
 * @param req Express request object
 * @param res Express response object
 */
export const deleteInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // In a real application, this would delete from a database
    
    res.status(200).json({ message: `Invoice ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
};

