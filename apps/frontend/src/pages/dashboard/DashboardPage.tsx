import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Summary and Recent Activity */}
      <div className="space-y-6">
        {/* Summary Statistics */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">SUMMARY</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="stats bg-primary text-primary-content shadow">
                <div className="stat">
                  <div className="stat-title">Pending Invoices</div>
                  <div className="stat-value">12</div>
                </div>
              </div>

              <div className="stats bg-secondary text-secondary-content shadow">
                <div className="stat">
                  <div className="stat-title">PRs Awaiting Approval</div>
                  <div className="stat-value">5</div>
                </div>
              </div>

              <div className="stats bg-accent text-accent-content shadow">
                <div className="stat">
                  <div className="stat-title">Completed PRs This Month</div>
                  <div className="stat-value">23</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">RECENT ACTIVITY</h2>
            <div className="space-y-3">
              <div className="bg-base-200 p-3 rounded-lg">
                <div className="font-medium">PR #123 Approved</div>
                <div className="text-sm opacity-70">2 hours ago</div>
              </div>

              <div className="bg-base-200 p-3 rounded-lg">
                <div className="font-medium">Invoices Imported</div>
                <div className="text-sm opacity-70">3 hours ago</div>
              </div>

              <div className="bg-base-200 p-3 rounded-lg">
                <div className="font-medium">PR #122 Completed</div>
                <div className="text-sm opacity-70">1 day ago</div>
              </div>

              <div className="bg-base-200 p-3 rounded-lg">
                <div className="font-medium">New Invoice Added</div>
                <div className="text-sm opacity-70">2 days ago</div>
              </div>

              <div className="bg-base-200 p-3 rounded-lg">
                <div className="font-medium">PR #121 Created</div>
                <div className="text-sm opacity-70">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Quick Actions and Notifications */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">QUICK ACTIONS</h2>
            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/invoices/import"
                className="btn btn-primary btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Import Invoices
              </Link>

              <Link
                to="/payment-requests/create"
                className="btn btn-secondary btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Payment Request
              </Link>

              <Link
                to="/payment-requests/approvals"
                className="btn btn-accent btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                View Approvals
              </Link>

              <Link
                to="/invoices"
                className="btn btn-neutral btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                View All Invoices
              </Link>

              <Link
                to="/payment-requests"
                className="btn btn-neutral btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                View All Payment Requests
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl">NOTIFICATIONS</h2>
            <div className="space-y-3">
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">PR #125 Requires Your Approval</h3>
                  <div className="text-xs">Pending since yesterday</div>
                </div>
                <Link to="/payment-requests/125" className="btn btn-sm">
                  View
                </Link>
              </div>

              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Changes Requested for PR #124</h3>
                  <div className="text-xs">3 hours ago</div>
                </div>
                <Link to="/payment-requests/124" className="btn btn-sm">
                  View
                </Link>
              </div>

              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">
                    Invoice Batch Successfully Imported
                  </h3>
                  <div className="text-xs">5 hours ago</div>
                </div>
                <Link to="/invoices" className="btn btn-sm">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Summary - Full Width */}
      <div className="card bg-base-100 shadow-xl lg:col-span-2">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="card-title">Welcome, John Doe</h2>
              <p className="text-sm opacity-70">
                Role: Admin | Last Login: Today, 09:45 AM
              </p>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Your Tasks</div>
                <div className="stat-value text-primary">3</div>
                <div className="stat-desc">Items requiring your attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status - Full Width */}
      <div className="card bg-base-100 shadow-xl lg:col-span-2">
        <div className="card-body">
          <h2 className="card-title text-xl">SYSTEM STATUS</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Invoice Processing</td>
                  <td>
                    <span className="badge badge-success">Operational</span>
                  </td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td>Payment Request System</td>
                  <td>
                    <span className="badge badge-success">Operational</span>
                  </td>
                  <td>5 minutes ago</td>
                </tr>
                <tr>
                  <td>Approval Workflow</td>
                  <td>
                    <span className="badge badge-success">Operational</span>
                  </td>
                  <td>10 minutes ago</td>
                </tr>
                <tr>
                  <td>Reporting System</td>
                  <td>
                    <span className="badge badge-warning">Maintenance</span>
                  </td>
                  <td>1 hour ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
