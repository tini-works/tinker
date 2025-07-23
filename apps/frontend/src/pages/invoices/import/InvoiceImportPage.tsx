import { useState, useRef, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../utils/formatters';

// Mock validation result data
interface ValidationResult {
  invoiceNumber: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'valid' | 'warning' | 'error';
  message?: string;
}

export function InvoiceImportPage() {
  const [step, setStep] = useState<'upload' | 'validate' | 'confirm'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [importOptions, setImportOptions] = useState({
    skipDuplicates: true,
    overrideExisting: false,
    validateOnly: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle import options change
  const handleOptionChange = (option: keyof typeof importOptions) => {
    setImportOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Handle file upload and validation
  const handleValidate = () => {
    if (!file) return;

    setIsValidating(true);

    // Simulate API call for validation
    setTimeout(() => {
      // Mock validation results
      const mockResults: ValidationResult[] = [
        {
          invoiceNumber: 'INV-2025-101',
          vendor: 'Acme Corp',
          amount: 1250.75,
          date: '2025-07-15',
          status: 'valid',
        },
        {
          invoiceNumber: 'INV-2025-102',
          vendor: 'Globex Inc',
          amount: 3450.0,
          date: '2025-07-18',
          status: 'warning',
          message: 'Duplicate invoice number',
        },
        {
          invoiceNumber: 'INV-2025-103',
          vendor: 'Initech',
          amount: 875.5,
          date: '2025-07-20',
          status: 'valid',
        },
        {
          invoiceNumber: 'INV-2025-104',
          vendor: 'Umbrella Corp',
          amount: 2100.25,
          date: '2025-07-22',
          status: 'error',
          message: 'Invalid date format',
        },
        {
          invoiceNumber: 'INV-2025-105',
          vendor: 'Wayne Enterprises',
          amount: 5600.0,
          date: '2025-07-25',
          status: 'valid',
        },
      ];

      setValidationResults(mockResults);
      setIsValidating(false);
      setStep('validate');
    }, 1500);
  };

  // Handle import confirmation
  const handleImport = () => {
    setIsImporting(true);

    // Simulate API call for import
    setTimeout(() => {
      setIsImporting(false);
      setStep('confirm');
    }, 2000);
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/invoices');
  };

  // Render status badge
  const renderStatusBadge = (status: 'valid' | 'warning' | 'error') => {
    let badgeClass = '';
    let label = '';

    switch (status) {
      case 'valid':
        badgeClass = 'badge-success';
        label = 'Valid';
        break;
      case 'warning':
        badgeClass = 'badge-warning';
        label = 'Warning';
        break;
      case 'error':
        badgeClass = 'badge-error';
        label = 'Error';
        break;
    }

    return <div className={`badge ${badgeClass}`}>{label}</div>;
  };

  // Count validation results by status
  const validCount = validationResults.filter(r => r.status === 'valid').length;
  const warningCount = validationResults.filter(
    r => r.status === 'warning'
  ).length;
  const errorCount = validationResults.filter(r => r.status === 'error').length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link to="/invoices" className="btn btn-ghost btn-sm mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Import Invoices</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <ul className="steps steps-horizontal w-full mb-8">
            <li
              className={`step ${step === 'upload' || step === 'validate' || step === 'confirm' ? 'step-primary' : ''}`}
            >
              Upload File
            </li>
            <li
              className={`step ${step === 'validate' || step === 'confirm' ? 'step-primary' : ''}`}
            >
              Validate
            </li>
            <li className={`step ${step === 'confirm' ? 'step-primary' : ''}`}>
              Confirm
            </li>
          </ul>

          {step === 'upload' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-lg p-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-base-300 mb-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <h3 className="text-lg font-medium mb-2">
                  Drag and drop your file here
                </h3>
                <p className="text-sm text-base-content/70 mb-4">or</p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                />

                <button
                  className="btn btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </button>

                {file && (
                  <div className="mt-4 text-center">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-base-content/70">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>

              <div className="divider">Import Options</div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={importOptions.skipDuplicates}
                      onChange={() => handleOptionChange('skipDuplicates')}
                    />
                    <span className="label-text ml-2">
                      Skip duplicate invoices
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={importOptions.overrideExisting}
                      onChange={() => handleOptionChange('overrideExisting')}
                    />
                    <span className="label-text ml-2">
                      Override existing invoices
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={importOptions.validateOnly}
                      onChange={() => handleOptionChange('validateOnly')}
                    />
                    <span className="label-text ml-2">
                      Validate only (no import)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button className="btn btn-outline" onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!file || isValidating}
                  onClick={handleValidate}
                >
                  {isValidating ? (
                    <>
                      <span className="loading loading-spinner" />
                      Validating...
                    </>
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'validate' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Valid</div>
                    <div className="stat-value text-success">{validCount}</div>
                    <div className="stat-desc">Ready to import</div>
                  </div>
                </div>

                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Warnings</div>
                    <div className="stat-value text-warning">
                      {warningCount}
                    </div>
                    <div className="stat-desc">Can be imported</div>
                  </div>
                </div>

                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Errors</div>
                    <div className="stat-value text-error">{errorCount}</div>
                    <div className="stat-desc">Cannot be imported</div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Vendor</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.invoiceNumber}</td>
                        <td>{result.vendor}</td>
                        <td>{formatCurrency(result.amount)}</td>
                        <td>{formatDate(result.date)}</td>
                        <td>{renderStatusBadge(result.status)}</td>
                        <td>{result.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="btn btn-outline"
                  onClick={() => setStep('upload')}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  disabled={errorCount > 0 || isImporting}
                  onClick={handleImport}
                >
                  {isImporting ? (
                    <>
                      <span className="loading loading-spinner" />
                      Importing...
                    </>
                  ) : importOptions.validateOnly ? (
                    'Done'
                  ) : (
                    'Import'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-success"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-2">Import Successful!</h2>
              <p className="text-lg mb-8">
                {validCount + warningCount} invoices have been successfully
                imported.
              </p>

              <div className="flex justify-center gap-4">
                <Link to="/invoices" className="btn btn-primary">
                  View Invoices
                </Link>
                <button
                  className="btn btn-outline"
                  onClick={() => setStep('upload')}
                >
                  Import More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
