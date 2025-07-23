import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InvoiceListPage } from './pages/invoices/InvoiceListPage';
import { InvoiceImportPage } from './pages/invoices/import/InvoiceImportPage';
// Import will be added when the file is implemented
// import { InvoiceSelectorPage } from './pages/invoices/selector/InvoiceSelectorPage';
import { PaymentRequestListPage } from './pages/payment-requests/PaymentRequestListPage';
// Import will be added when the file is implemented
// import { CreatePaymentRequestPage } from './pages/payment-requests/create/CreatePaymentRequestPage';
// Import will be added when the file is implemented
// import { PaymentRequestDetailPage } from './pages/payment-requests/detail/PaymentRequestDetailPage';
import { ApprovalPage } from './pages/payment-requests/approval/ApprovalPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoiceListPage />} />
        <Route path="/invoices/import" element={<InvoiceImportPage />} />
        {/* Route will be uncommented when the component is implemented */}
        {/* <Route path="/invoices/selector" element={<InvoiceSelectorPage />} /> */}
        <Route path="/payment-requests" element={<PaymentRequestListPage />} />
        {/* Route will be uncommented when the component is implemented */}
        {/* <Route path="/payment-requests/create" element={<CreatePaymentRequestPage />} /> */}
        {/* Route will be uncommented when the component is implemented */}
        {/* <Route path="/payment-requests/:id" element={<PaymentRequestDetailPage />} /> */}
        <Route path="/payment-requests/:id/approve" element={<ApprovalPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

