import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './compoments/Navbar';
import Footer from './compoments/Footer';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPassPage from "./pages/ForgetPassPage";
import ProductPage from "./pages/ProductPage";
import DiscountPage from "./pages/DiscountPage";
import CartPage from "./pages/CartPage";
import UpgradePage from "./pages/UpgradePage";
import AboutUsPage from "./pages/AboutUsPage";
import Up from './compoments/Up';
import AI from './compoments/AI';
import DetailProductPage from './pages/DetailProductPage';
import './App.css';
import AdminLayout from "./compoments/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/OrderList";

// Wrapper component to conditionally render Navbar and Footer
const AppLayout = () => {
  const location = useLocation();
  const hideNavbarAndFooter = ["/login", "/signup", "/forget"].includes(location.pathname);

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

          //Admin dashboard
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