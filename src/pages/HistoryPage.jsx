import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HistoryPage.scss';

const HistoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('userId'); // Đảm bảo user_id được lưu ở localStorage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ localStorage
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/orders/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTransactions(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <div className="container history-container">
            <div className="history-card">
                <h2 className="history-title">
                    <span role="img" aria-label="history" className="history-icon">🧾</span>
                    Lịch sử giao dịch
                </h2>
                <div className="transaction-list">
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ngày tạo</th>
                                <th>Phương thức thanh toán</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Sản phẩm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.order_id}>
                                        <td>{transaction.order_id}</td>
                                        <td>{new Date(transaction.createdAt).toLocaleString('vi-VN')}</td>
                                        <td>{transaction.payment_method}</td>
                                        <td>{Math.round(transaction.total_amount || 0).toLocaleString('vi-VN')} VND</td>
                                        <td className={transaction.status ? 'success' : 'fail'}>{transaction.status ? 'Thành công' : 'Thất bại'}</td>
                                        <td>
                                            {transaction.orderItems && transaction.orderItems.length > 0 ? (
                                                <ul className="order-items-list">
                                                    {transaction.orderItems.map((item) => (
                                                        <li key={item.order_item_id}>
                                                            Mã SP: {item.product_id} | SL: {item.quantity} | Giá: {Math.round(item.price).toLocaleString('vi-VN')} VND
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>Không có sản phẩm</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Không có giao dịch nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-back" onClick={() => window.history.back()}>
                    ← Quay lại
                </button>
            </div>
        </div>
    );
};

export default HistoryPage;
