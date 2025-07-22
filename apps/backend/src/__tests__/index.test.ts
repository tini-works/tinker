import request from 'supertest';
import express from 'express';
import { Invoice, InvoiceStatus } from '@invoice-approval/shared';

// Mock express app for testing
const app = express();
app.use(express.json());

// Sample data for testing
const testInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    vendorName: 'Test Corp',
    amount: 1500.00,
    date: '2023-01-15',
    description: 'Test supplies',
    status: InvoiceStatus.PENDING,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z'
  }
];

// Mock routes for testing
app.get('/api/invoices', (req, res) => {
  res.json(testInvoices);
});

app.get('/api/invoices/:id', (req, res) => {
  const invoice = testInvoices.find(inv => inv.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }
  res.json(invoice);
});

describe('Invoice API', () => {
  it('GET /api/invoices should return all invoices', async () => {
    const response = await request(app).get('/api/invoices');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testInvoices);
  });

  it('GET /api/invoices/:id should return a specific invoice', async () => {
    const response = await request(app).get('/api/invoices/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testInvoices[0]);
  });

  it('GET /api/invoices/:id with invalid ID should return 404', async () => {
    const response = await request(app).get('/api/invoices/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Invoice not found' });
  });
});

