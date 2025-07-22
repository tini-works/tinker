import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Invoice Approval System</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div>Dashboard (Coming Soon)</div>} />
          <Route path="/invoices" element={<div>Invoices (Coming Soon)</div>} />
          <Route path="/payment-requests" element={<div>Payment Requests (Coming Soon)</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

