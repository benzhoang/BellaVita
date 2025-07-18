import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PaymentPage.scss';
import { useNavigate } from 'react-router-dom';
import VNPayIcon from '../images/VNPay.jpg';

const PaymentPage = () => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const USE_API = false; // 👉 Đặt thành true để bật lại khi cần

    const handlePayment = async () => {
        setIsLoading(true);
        setError('');
        const orderId = localStorage.getItem('orderId');

        if (!USE_API) {
            // 👇 Dùng link giả khi không gọi API
            const fakePaymentUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            localStorage.setItem('qrPaymentUrl', fakePaymentUrl);
            navigate('/qr');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const paymentData = {
                orderDescription: `Thanh toán đơn hàng ${orderId}`,
                orderId: orderId
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/payment/create_payment_url`,
                paymentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data?.paymentUrl) {
                localStorage.setItem('qrPaymentUrl', response.data.paymentUrl);
                navigate('/qr');
            } else {
                setError('Không thể tạo liên kết thanh toán.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi tạo thanh toán.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="payment-page-container">
            <div className="payment-card">
                <div className="payment-header">
                    <h2>Xác nhận thanh toán</h2>
                    <div className="payment-logo">
                        <i className="fas fa-lock"></i>
                    </div>
                </div>

                <div className="payment-body">
                    <div className="payment-message">
                        <i className="fas fa-info-circle message-icon"></i>
                        <p>Cảm ơn bạn đã đặt hàng. Vui lòng xác nhận để tiếp tục quá trình thanh toán an toàn.</p>
                    </div>

                    {error && (
                        <div className="payment-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="payment-methods">
                        <div className="payment-method-title">Phương thức thanh toán</div>
                        <div className="payment-icons">
                            <img src={VNPayIcon} alt="VNPay" className="vnpay-icon" />
                        </div>
                    </div>

                    <div className="payment-actions">
                        <button
                            className="payment-button"
                            onClick={handlePayment}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-credit-card"></i>
                                    <span>Tiến hành thanh toán</span>
                                </>
                            )}
                        </button>

                        <button className="back-button" onClick={() => navigate(-1)}>
                            <i className="fas fa-arrow-left"></i>
                            <span>Quay lại</span>
                        </button>
                    </div>
                </div>

                <div className="payment-footer">
                    <p>Giao dịch được bảo mật bởi <span className="highlight">BellaVita Pay</span></p>
                    <div className="security-icons">
                        <i className="fas fa-shield-alt"></i>
                        <i className="fas fa-lock"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
