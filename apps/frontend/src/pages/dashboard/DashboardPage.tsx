import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card bg-primary text-primary-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Pending Invoices</h2>
          <p className="text-4xl font-bold">12</p>
          <div className="card-actions justify-end">
            <Link to="/invoices" className="btn btn-sm">View All</Link>
          </div>
        </div>
      </div>
      
      <div className="card bg-secondary text-secondary-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">PRs Awaiting Approval</h2>
          <p className="text-4xl font-bold">5</p>
          <div className="card-actions justify-end">
            <Link to="/payment-requests" className="btn btn-sm">View All</Link>
          </div>
        </div>
      </div>
      
      <div className="card bg-accent text-accent-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Completed PRs</h2>
          <p className="text-4xl font-bold">28</p>
          <div className="card-actions justify-end">
            <Link to="/payment-requests" className="btn btn-sm">View All</Link>
          </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-3">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-07-22</td>
                  <td>John Doe</td>
                  <td>Created</td>
                  <td>Payment Request #123</td>
                </tr>
                <tr>
                  <td>2025-07-21</td>
                  <td>Jane Smith</td>
                  <td>Approved</td>
                  <td>Payment Request #122</td>
                </tr>
                <tr>
                  <td>2025-07-21</td>
                  <td>Bob Johnson</td>
                  <td>Imported</td>
                  <td>10 Invoices</td>
                </tr>
                <tr>
                  <td>2025-07-20</td>
                  <td>Alice Brown</td>
                  <td>Completed</td>
                  <td>Payment Request #121</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-3">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/invoices" className="btn btn-primary">View Invoices</Link>
            <Link to="/invoices/import" className="btn btn-secondary">Import Invoices</Link>
            <Link to="/payment-requests/create" className="btn btn-accent">Create Payment Request</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

