import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatters';

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

export function CreatePaymentRequestPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vendor: '',
    department: '',
    dueDate: '',
  });
  
  const [selectedInvoices] = useState<Invoice[]>([
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
      vendor: 'Acme Corporation',
      amount: 3000.00,
      date: '2025-07-05',
      dueDate: '2025-07-31',
      status: 'pending',
    },
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total amount from selected invoices
  const totalAmount = selectedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.vendor || !formData.department || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create payment request
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the newly created payment request
      navigate('/payment-requests/1');
    }, 1500);
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Payment Request</h1>
        <Link to="/payment-requests" className="btn btn-ghost">
          Cancel
        </Link>
      </div>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Vendor *</span>
                </label>
                <input
                  type="text"
                  name="vendor"
                  className="input input-bordered"
                  value={formData.vendor || selectedInvoices[0]?.vendor || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Department *</span>
                </label>
                <select
                  name="department"
                  className="select select-bordered"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Legal">Legal</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Due Date *</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  className="input input-bordered"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            
            <div className="divider">Linked Invoices</div>
            
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.vendor}</td>
                      <td>{formatCurrency(invoice.amount)}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.dueDate}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="text-right font-bold">Total:</td>
                    <td className="font-bold">{formatCurrency(totalAmount)}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between mt-6">
              <Link to="/invoices/selector" className="btn btn-outline">
                Add More Invoices
              </Link>
              <div className="flex gap-2">
                <Link to="/payment-requests" className="btn btn-ghost">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Payment Request'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

