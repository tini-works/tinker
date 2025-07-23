import { Link } from 'react-router-dom';

export function InvoiceListPage() {
  // This is a placeholder that will be fully implemented in issue #5
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <p className="mb-4">Invoice list coming soon...</p>
      <div className="flex gap-2">
        <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
}

