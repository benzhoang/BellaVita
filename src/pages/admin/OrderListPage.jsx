// OrderList.jsx
import React, { useState } from 'react';
import '../../styles/OrderList.scss';

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Order Details - {order.id}</h3>
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Total:</strong> {order.total.toLocaleString()} ₫</p>
        <p><strong>Status:</strong> {order.status}</p>
        <button onClick={onClose} className="btn close">Close</button>
      </div>
    </div>
  );
};

const OrderList = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    {
      id: 'ORD001',
      customer: 'Nguyen Van A',
      date: '2025-06-28',
      total: 250000,
      status: 'Pending'
    },
    {
      id: 'ORD002',
      customer: 'Tran Thi B',
      date: '2025-06-27',
      total: 460000,
      status: 'Completed'
    },
    {
      id: 'ORD003',
      customer: 'Le Van C',
      date: '2025-06-26',
      total: 150000,
      status: 'Cancelled'
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="order-list">
      <div className="header">
        <h2>Order Management</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.total.toLocaleString()} ₫</td>
              <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
              <td><button className="btn view" onClick={() => handleView(order)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>{'<'}</button>
        <span>Page 1 of 1</span>
        <button>{'>'}</button>
      </div>

      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
