import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Retail from './pages/Retail';
import Loop from './pages/Loop';
import Access from './pages/Access';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import ErpCrmIntegration from './components/ErpCrmIntegration';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ErpCrmProvider } from './context/ErpCrmContext';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import ProductDetail from './pages/ProductDetail';
import BundleDetail from './pages/BundleDetail';
import AdventureGeneratorPage from './pages/AdventureGeneratorPage';
import Preloader from './components/Preloader';

function App() {
  const [isLoaded, setIsLoaded] = useState(() => {
    // Check if preloader has already run in this session
    return sessionStorage.getItem('arena_preloader_run') === 'true';
  });

  const handleLoaded = () => {
    setIsLoaded(true);
    sessionStorage.setItem('arena_preloader_run', 'true');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ErpCrmProvider>
          {!isLoaded && <Preloader onComplete={handleLoaded} />}
          <Router>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="retail" element={<Retail />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="bundle/:id" element={<BundleDetail />} />
              <Route path="loop" element={<Loop />} />
              <Route path="access" element={<Access />} />
              <Route path="returns" element={<ReturnPolicy />} />
              <Route path="shipping" element={<ShippingPolicy />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="adventure-generator" element={<AdventureGeneratorPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="erp-crm" element={<ErpCrmIntegration />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Router>
        </ErpCrmProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
