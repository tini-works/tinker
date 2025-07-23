import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InvoiceListPage } from './pages/invoices/InvoiceListPage';
import { InvoiceDetailPage } from './pages/invoices/detail/InvoiceDetailPage';
import { InvoiceImportPage } from './pages/invoices/import/InvoiceImportPage';
import { InvoiceSelectorPage } from './pages/invoices/selector/InvoiceSelectorPage';
import { LoginPage } from './pages/auth/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PaymentRequestListPage } from './pages/payment-requests/PaymentRequestListPage';
import { CreatePaymentRequestPage } from './pages/payment-requests/create/CreatePaymentRequestPage';
import { PaymentRequestDetailPage } from './pages/payment-requests/detail/PaymentRequestDetailPage';
import { ApprovalPage } from './pages/payment-requests/approval/ApprovalPage';

// Protected route component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  if (!isAuthenticated) {
    // For demo purposes, we'll just render the content
    // In a real app, this would redirect to login: return <Navigate to="/login" />;
    return children;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices" element={
        <ProtectedRoute>
          <MainLayout>
            <InvoiceListPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <InvoiceDetailPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices/import" element={
        <ProtectedRoute>
          <MainLayout>
            <InvoiceImportPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices/selector" element={
        <ProtectedRoute>
          <MainLayout>
            <InvoiceSelectorPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payment-requests" element={
        <ProtectedRoute>
          <MainLayout>
            <PaymentRequestListPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payment-requests/create" element={
        <ProtectedRoute>
          <MainLayout>
            <CreatePaymentRequestPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payment-requests/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <PaymentRequestDetailPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payment-requests/:id/approve" element={
        <ProtectedRoute>
          <MainLayout>
            <ApprovalPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

