// src/admin/pages/OrderList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa'; // Eye icon for view
import '../../styles/OrderList.scss';

const API_URL = import.meta.env.VITE_API_URL;

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Payment Method:</strong> {order.payment_method}</p>
        <p><strong>Total Amount:</strong> {order.total_amount.toLocaleString()} ₫</p>
        <p><strong>Status:</strong> {order.status ? 'Completed' : 'Pending'}</p>
        <button onClick={onClose} className="btn close">Close</button>
      </div>
    </div>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json'
          }
        });
        
        setOrders(res.data.map(order => ({
          ...order,
          order_id: order.order_id?.toString() ?? ''
        })));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order =>
    order.order_id.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' ||
      (statusFilter === 'Completed' && order.status) ||
      (statusFilter === 'Pending' && !order.status))
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
            placeholder="Search by Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.payment_method}</td>
                <td>{order.total_amount.toLocaleString()} ₫</td>
                <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                <td>
                  <span className={`status ${order.status ? 'completed' : 'pending'}`}>
                    {order.status ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="actions">
                  <button title="View detail" className="icon-btn view" onClick={() => handleView(order)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            {'<'}
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            {'>'}
          </button>
        </div>
      )}

      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
