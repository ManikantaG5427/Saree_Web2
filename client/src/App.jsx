import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { OrderProvider } from './contexts/OrderContext.jsx';

import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CartDrawer } from './components/layout/CartDrawer.jsx';

import { Home } from './pages/Home.jsx';
import { Shop } from './pages/Shop.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Cart } from './pages/Cart.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { PaymentResult } from './pages/PaymentResult.jsx';
import { Orders } from './pages/Orders.jsx';
import { TrackOrder } from './pages/TrackOrder.jsx';
import { Wishlist } from './pages/Wishlist.jsx';
import { Auth } from './pages/Auth.jsx';
import { Profile } from './pages/Profile.jsx';
import { About } from './pages/About.jsx';
import { HandloomGuide } from './pages/HandloomGuide.jsx';
import { Wholesale } from './pages/Wholesale.jsx';
import { Contact } from './pages/Contact.jsx';
import { Policies } from './pages/Policies.jsx';
import { Admin } from './pages/Admin.jsx';
import { NotFound } from './pages/NotFound.jsx';

import './index.css';

// Automatically scroll to top on every route transition
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash]);

  return null;
}

function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

function PrivateCustomerRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="w-8 h-8 border-4 border-[#280030] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#280030]">
        <div className="w-8 h-8 border-4 border-[#F0C860] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  // Allow direct admin or if role is admin
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Customer Facing Routes Wrapped in CustomerLayout */}
                  <Route element={<CustomerLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/products" element={<Navigate to="/shop" replace />} />
                    <Route path="/collections/:slug" element={<Shop />} />
                    <Route path="/categories/:slug" element={<Shop />} />
                    <Route path="/search" element={<Shop />} />
                    
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/payment-result" element={<PaymentResult />} />
                    
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/handloom-guide" element={<HandloomGuide />} />
                    <Route path="/wholesale" element={<Wholesale />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    <Route path="/faq" element={<Policies initialTab="faq" />} />
                    <Route path="/shipping-policy" element={<Policies initialTab="shipping" />} />
                    <Route path="/returns-policy" element={<Policies initialTab="returns" />} />
                    <Route path="/privacy-policy" element={<Policies initialTab="privacy" />} />
                    <Route path="/terms" element={<Policies initialTab="terms" />} />
                    
                    <Route path="/login" element={<Auth />} />
                    <Route path="/register" element={<Auth />} />
                    
                    <Route
                      path="/account"
                      element={
                        <PrivateCustomerRoute>
                          <Profile />
                        </PrivateCustomerRoute>
                      }
                    />
                    <Route
                      path="/account/addresses"
                      element={
                        <PrivateCustomerRoute>
                          <Profile />
                        </PrivateCustomerRoute>
                      }
                    />
                    <Route
                      path="/account/orders"
                      element={
                        <PrivateCustomerRoute>
                          <Orders />
                        </PrivateCustomerRoute>
                      }
                    />
                    <Route
                      path="/account/returns"
                      element={
                        <PrivateCustomerRoute>
                          <Orders />
                        </PrivateCustomerRoute>
                      }
                    />
                  </Route>

                  {/* Protected Admin Console */}
                  <Route
                    path="/admin/*"
                    element={
                      <AdminRoute>
                        <Admin />
                      </AdminRoute>
                    }
                  />

                  {/* Proper 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
