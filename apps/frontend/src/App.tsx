import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InvoiceListPage } from './pages/invoices/InvoiceListPage';
import { InvoiceSelectorPage } from './pages/invoices/selector/InvoiceSelectorPage';
import { PaymentRequestListPage } from './pages/payment-requests/PaymentRequestListPage';
import { CreatePaymentRequestPage } from './pages/payment-requests/create/CreatePaymentRequestPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoiceListPage />} />
        <Route path="/invoices/selector" element={<InvoiceSelectorPage />} />
        <Route path="/payment-requests" element={<PaymentRequestListPage />} />
        <Route path="/payment-requests/create" element={<CreatePaymentRequestPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

