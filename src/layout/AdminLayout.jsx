// src/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../styles/Admin.scss';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token hoặc thông tin đăng nhập   
    localStorage.removeItem("authToken"); 
    sessionStorage.removeItem("authUser");
    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">SkinTime Admin</div>
        <nav className="menu">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/users">Người dùng</NavLink>
          <NavLink to="/admin/products">Sản phẩm</NavLink>
          <NavLink to="/admin/orders">Đơn hàng</NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="header">
          <div className="page-title">Quản trị hệ thống</div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
