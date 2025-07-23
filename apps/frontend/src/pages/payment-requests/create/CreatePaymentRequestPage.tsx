import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  selected?: boolean;
}

// Payment request form data
interface PaymentRequestForm {
  title: string;
  description: string;
  dueDate: string;
  paymentMethod: string;
  accountNumber: string;
  notes: string;
  selectedInvoices: string[];
  vendor?: string;
  department?: string;
}

export function CreatePaymentRequestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialInvoiceId = searchParams.get('invoiceId');
  
  const [availableInvoices, setAvailableInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [formData, setFormData] = useState<PaymentRequestForm>({
    title: '',
    description: '',
    dueDate: '',
    paymentMethod: 'bank_transfer',
    accountNumber: '',
    notes: '',
    selectedInvoices: initialInvoiceId ? [initialInvoiceId] : [],
    vendor: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch available invoices
    setTimeout(() => {
      // Mock invoice data
      const mockInvoices: Invoice[] = [
        {
          id: '1',
          invoiceNumber: 'INV-2025-001',
          vendor: 'Acme Corporation',
          amount: 1250.75,
          date: '2025-07-15',
          dueDate: '2025-07-30',
          status: 'pending',
          selected: initialInvoiceId === '1',
        },
        {
          id: '2',
          invoiceNumber: 'INV-2025-002',
          vendor: 'Globex Inc',
          amount: 3450.00,
          date: '2025-07-16',
          dueDate: '2025-07-31',
          status: 'pending',
          selected: initialInvoiceId === '2',
        },
        {
          id: '3',
          invoiceNumber: 'INV-2025-003',
          vendor: 'Initech',
          amount: 875.50,
          date: '2025-07-18',
          dueDate: '2025-08-15',
          status: 'pending',
          selected: initialInvoiceId === '3',
        },
        {
          id: '4',
          invoiceNumber: 'INV-2025-004',
          vendor: 'Umbrella Corp',
          amount: 2100.25,
          date: '2025-07-20',
          dueDate: '2025-08-20',
          status: 'pending',
          selected: initialInvoiceId === '4',
        },
        {
          id: '5',
          invoiceNumber: 'INV-2025-005',
          vendor: 'Wayne Enterprises',
          amount: 5600.00,
          date: '2025-07-22',
          dueDate: '2025-08-22',
          status: 'pending',
          selected: initialInvoiceId === '5',
        },
      ];
      
      setAvailableInvoices(mockInvoices);
      setFilteredInvoices(mockInvoices);
      setIsLoading(false);
    }, 1000);
  }, [initialInvoiceId]);
  
  // Filter invoices based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredInvoices(availableInvoices);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = availableInvoices.filter(invoice => 
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.vendor.toLowerCase().includes(query)
    );
    
    setFilteredInvoices(filtered);
  }, [searchQuery, availableInvoices]);
  
  // Handle form input change
  const handleInputChange = (field: keyof PaymentRequestForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when field is updated
    if (formErrors[field]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };
  
  // Toggle invoice selection
  const handleInvoiceToggle = (invoiceId: string) => {
    const updatedInvoices = [...availableInvoices];
    const index = updatedInvoices.findIndex(inv => inv.id === invoiceId);
    
    if (index !== -1) {
      updatedInvoices[index] = {
        ...updatedInvoices[index],
        selected: !updatedInvoices[index].selected,
      };
      
      setAvailableInvoices(updatedInvoices);
      
      // Update selected invoices in form data
      const selectedIds = updatedInvoices
        .filter(inv => inv.selected)
        .map(inv => inv.id);
      
      setFormData(prev => ({
        ...prev,
        selectedInvoices: selectedIds,
      }));
      
      // Clear error if any invoices are selected
      if (selectedIds.length > 0 && formErrors.selectedInvoices) {
        setFormErrors(prev => {
          const updated = { ...prev };
          delete updated.selectedInvoices;
          return updated;
        });
      }
    }
  };
  
  // Get selected invoices
  const selectedInvoices = availableInvoices.filter(inv => inv.selected);
  
  // Calculate total amount
  const totalAmount = selectedInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required';
    }
    
    if (!formData.vendor?.trim()) {
      errors.vendor = 'Vendor is required';
    }
    
    if (!formData.department?.trim()) {
      errors.department = 'Department is required';
    }
    
    if (formData.paymentMethod === 'bank_transfer' && !formData.accountNumber.trim()) {
      errors.accountNumber = 'Account number is required for bank transfers';
    }
    
    if (selectedInvoices.length === 0) {
      errors.selectedInvoices = 'At least one invoice must be selected';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create payment request
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to payment request list with success message
      navigate('/payment-requests?success=created');
    }, 1500);
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
      <div className="flex items-center mb-6">
        <Link to="/payment-requests" className="btn btn-ghost btn-sm mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Create Payment Request</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Payment Request Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Title *</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${formErrors.title ? 'input-error' : ''}`}
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter payment request title"
                    />
                    {formErrors.title && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formErrors.title}</span>
                      </label>
                    )}
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Vendor *</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full ${formErrors.vendor ? 'input-error' : ''}`}
                      value={formData.vendor || selectedInvoices[0]?.vendor || ''}
                      onChange={(e) => handleInputChange('vendor', e.target.value)}
                      placeholder="Enter vendor name"
                    />
                    {formErrors.vendor && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formErrors.vendor}</span>
                      </label>
                    )}
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Department *</span>
                    </label>
                    <select
                      className={`select select-bordered w-full ${formErrors.department ? 'select-error' : ''}`}
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
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
                    {formErrors.department && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formErrors.department}</span>
                      </label>
                    )}
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Due Date *</span>
                    </label>
                    <input
                      type="date"
                      className={`input input-bordered w-full ${formErrors.dueDate ? 'input-error' : ''}`}
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    />
                    {formErrors.dueDate && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formErrors.dueDate}</span>
                      </label>
                    )}
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Payment Method</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  
                  {formData.paymentMethod === 'bank_transfer' && (
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Account Number *</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full ${formErrors.accountNumber ? 'input-error' : ''}`}
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        placeholder="Enter account number"
                      />
                      {formErrors.accountNumber && (
                        <label className="label">
                          <span className="label-text-alt text-error">{formErrors.accountNumber}</span>
                        </label>
                      )}
                    </div>
                  )}
                  
                  <div className="form-control w-full md:col-span-2">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter payment request description"
                    ></textarea>
                  </div>
                  
                  <div className="form-control w-full md:col-span-2">
                    <label className="label">
                      <span className="label-text">Additional Notes</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Enter any additional notes"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title text-xl">Selected Invoices</h2>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowInvoiceSelector(!showInvoiceSelector)}
                  >
                    {showInvoiceSelector ? 'Hide Invoice Selector' : 'Select Invoices'}
                  </button>
                </div>
                
                {formErrors.selectedInvoices && (
                  <div className="alert alert-error mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formErrors.selectedInvoices}</span>
                  </div>
                )}
                
                {showInvoiceSelector && (
                  <div className="mb-6">
                    <div className="form-control mb-4">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search invoices..."
                          className="input input-bordered w-full"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" className="btn btn-square">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Invoice #</th>
                            <th>Vendor</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Due Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id} className={invoice.selected ? 'bg-base-200' : ''}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  checked={invoice.selected || false}
                                  onChange={() => handleInvoiceToggle(invoice.id)}
                                />
                              </td>
                              <td>{invoice.invoiceNumber}</td>
                              <td>{invoice.vendor}</td>
                              <td>{formatCurrency(invoice.amount)}</td>
                              <td>{formatDate(invoice.date)}</td>
                              <td>{formatDate(invoice.dueDate)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {selectedInvoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Invoice #</th>
                          <th>Vendor</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Due Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoices.map((invoice) => (
                          <tr key={invoice.id}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.vendor}</td>
                            <td>{formatCurrency(invoice.amount)}</td>
                            <td>{formatDate(invoice.date)}</td>
                            <td>{formatDate(invoice.dueDate)}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline btn-error"
                                onClick={() => handleInvoiceToggle(invoice.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>No invoices selected. Click "Select Invoices" to add invoices to this payment request.</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Link to="/payment-requests" className="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  'Create Payment Request'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Summary Sidebar */}
        <div>
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-70">Selected Invoices</div>
                  <div className="text-xl font-bold">{selectedInvoices.length}</div>
                </div>
                
                <div>
                  <div className="text-sm opacity-70">Total Amount</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <div className="text-sm opacity-70">Payment Method</div>
                  <div className="font-medium">
                    {formData.paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                    {formData.paymentMethod === 'check' && 'Check'}
                    {formData.paymentMethod === 'credit_card' && 'Credit Card'}
                    {formData.paymentMethod === 'cash' && 'Cash'}
                  </div>
                </div>
                
                {formData.dueDate && (
                  <div>
                    <div className="text-sm opacity-70">Due Date</div>
                    <div className="font-medium">{formatDate(formData.dueDate)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

