import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPassPage from "./pages/ForgetPassPage";
import ProductPage from "./pages/ProductPage";
import DiscountPage from "./pages/DiscountPage";
import CartPage from "./pages/CartPage";
import UpgradePage from "./pages/UpgradePage";
import AboutUsPage from "./pages/AboutUsPage";
import Up from './components/Up';
import AI from './components/AI';
import DetailProductPage from './pages/DetailProductPage';
import PaymentPage from './pages/PaymentPage';
import PaymentResult from "./pages/PaymentResult";
import QRPage from './pages/QRPage';

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/DashboardPage";
import UserList from "./pages/admin/UserListPage";
import ProductList from "./pages/admin/ProductListPage";
import OrderList from "./pages/admin/OrderListPage";
import './App.css';

// Wrapper component to conditionally render Navbar and Footer
const AppLayout = () => {
  const location = useLocation();
  const hideNavbarAndFooter = ["/login", "/signup", "/forget", '/admin', '/admin/users', '/admin/products', '/admin/orders'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {!hideNavbarAndFooter && <Navbar />}
      <ToastContainer position="top-right" autoClose={2000} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/forget" element={<ForgetPassPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/discount" element={<DiscountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/product/:id" element={<DetailProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/qr" element={<QRPage />} />

          {/* Admin dashboard  */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
          </Route>
        </Routes>
      </div>

      {!hideNavbarAndFooter && <Footer />}
      {!hideNavbarAndFooter && <Up />}
      {!hideNavbarAndFooter && <AI />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;