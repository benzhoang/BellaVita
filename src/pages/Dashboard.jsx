// src/admin/pages/Dashboard.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../styles/Dashboard.scss';

const stats = [
  { title: 'Người dùng', value: 1024, icon: 'bi-people-fill', color: 'primary' },
  { title: 'Sản phẩm', value: 312, icon: 'bi-box-seam', color: 'success' },
  { title: 'Đơn hàng', value: 587, icon: 'bi-bag-check-fill', color: 'warning' },
  { title: 'Doanh thu', value: '$12.3K', icon: 'bi-currency-dollar', color: 'info' },
];

const chartData = [
  { name: 'Th1', orders: 120 },
  { name: 'Th2', orders: 200 },
  { name: 'Th3', orders: 150 },
  { name: 'Th4', orders: 278 },
  { name: 'Th5', orders: 189 },
  { name: 'Th6', orders: 239 },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h4 className="mb-4">Thống kê tổng quan</h4>

      <div className="row g-4 mb-5">
        {stats.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div className={`card text-bg-${item.color} shadow-sm h-100`}>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="card-title mb-1">{item.title}</h6>
                  <h3 className="card-text fw-bold">{item.value}</h3>
                </div>
                <i className={`bi ${item.icon} fs-1 opacity-50`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white fw-bold">Biểu đồ đơn hàng 6 tháng</div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#0d6efd" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}