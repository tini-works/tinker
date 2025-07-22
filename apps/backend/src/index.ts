import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Invoice, InvoiceStatus, formatCurrency } from '@invoice-approval/shared';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
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

// Routes
app.get('/api/invoices', (req, res) => {
  res.json(invoices);
});

app.get('/api/invoices/:id', (req, res) => {
  const invoice = invoices.find(inv => inv.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }
  res.json(invoice);
});

app.post('/api/invoices', (req, res) => {
  const newInvoice: Invoice = {
    id: (invoices.length + 1).toString(),
    ...req.body
  };
  invoices.push(newInvoice);
  res.status(201).json(newInvoice);
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
  console.log(`Example invoice amount: ${formatCurrency(invoices[0].amount, invoices[0].currency)}`);
});

