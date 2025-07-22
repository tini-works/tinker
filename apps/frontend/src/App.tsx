import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InvoiceListPage } from './pages/invoices/InvoiceListPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoiceListPage />} />
        <Route path="/payment-requests" element={
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Payment Requests</h2>
            <p>Payment request list coming soon...</p>
          </div>
        } />
      </Routes>
    </MainLayout>
  );
}

export default App;

