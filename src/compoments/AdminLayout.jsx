// src/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
// import './assets/admin.scss';
import '../styles/Admin.scss';

export default function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3 admin-sidebar">
          <h4 className="text-center">Admin Panel</h4>
          <nav className="nav flex-column">
            <NavLink to="/admin" end className="nav-link text-white" activeclassname="active">Dashboard</NavLink>
            <NavLink to="/admin/users" className="nav-link text-white" activeclassname="active">Người dùng</NavLink>
            <NavLink to="/admin/products" className="nav-link text-white" activeclassname="active">Sản phẩm</NavLink>
            <NavLink to="/admin/orders" className="nav-link text-white" activeclassname="active">Đơn hàng</NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <div className="col-12 col-md-9 col-lg-10 admin-main">
          {/* Navbar */}
          <header className="bg-light p-3 shadow-sm admin-navbar">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Quản trị hệ thống</h5>
              <div>Xin chào, Admin</div>
            </div>
          </header>

          {/* Nội dung trang con */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
