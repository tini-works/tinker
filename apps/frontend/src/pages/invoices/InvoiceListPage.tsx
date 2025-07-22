import { Link } from 'react-router-dom';

export function InvoiceListPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title text-2xl">Invoices</h2>
          <Link to="/invoices/import" className="btn btn-primary">Import Invoices</Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <div className="input-group">
              <input type="text" placeholder="Search invoices..." className="input input-bordered w-full" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
          
          <select className="select select-bordered">
            <option disabled selected>Status</option>
            <option>All</option>
            <option>Pending</option>
            <option>Linked</option>
            <option>Obsolete</option>
          </select>
          
          <select className="select select-bordered">
            <option disabled selected>Sort By</option>
            <option>Date (Newest)</option>
            <option>Date (Oldest)</option>
            <option>Amount (High to Low)</option>
            <option>Amount (Low to High)</option>
            <option>Vendor Name</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-001</td>
                <td>Acme Corp</td>
                <td>$1,200.00</td>
                <td>2025-07-15</td>
                <td><span className="badge badge-primary">Pending</span></td>
                <td>
                  <div className="flex gap-2">
                    <Link to="/invoices/1" className="btn btn-sm">View</Link>
                    <button className="btn btn-sm btn-error">Mark Obsolete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-002</td>
                <td>Globex Inc</td>
                <td>$3,500.00</td>
                <td>2025-07-14</td>
                <td><span className="badge badge-secondary">Linked</span></td>
                <td>
                  <div className="flex gap-2">
                    <Link to="/invoices/2" className="btn btn-sm">View</Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-003</td>
                <td>Initech</td>
                <td>$750.00</td>
                <td>2025-07-12</td>
                <td><span className="badge badge-primary">Pending</span></td>
                <td>
                  <div className="flex gap-2">
                    <Link to="/invoices/3" className="btn btn-sm">View</Link>
                    <button className="btn btn-sm btn-error">Mark Obsolete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>INV-004</td>
                <td>Umbrella Corp</td>
                <td>$2,100.00</td>
                <td>2025-07-10</td>
                <td><span className="badge badge-accent">Obsolete</span></td>
                <td>
                  <div className="flex gap-2">
                    <Link to="/invoices/4" className="btn btn-sm">View</Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}

