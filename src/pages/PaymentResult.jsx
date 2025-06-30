import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentResult.scss';

const PaymentResult = () => {
    const navigate = useNavigate();

    return (
        <div className="container payment-result-container d-flex flex-column align-items-center justify-content-center">
            <div className="card shadow-lg p-4 mt-5 text-center payment-result-card">
                <div className="mb-3">
                    <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h2 className="mb-3">Thanh toán thành công!</h2>
                <p className="mb-4">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xử lý thành công.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                    <i className="fas fa-home"></i> Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default PaymentResult; 