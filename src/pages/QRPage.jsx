import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QRPage.scss';
import QRImage from '../images/QR.jpg';
import Logo from '../images/Logo.jpg';
import { clearCartData } from '../utils/cartUtils';

const QRPage = () => {
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = () => {
        setShowPopup(false);
        navigate('/order-history');
    };

    const handleQRScan = () => {
        // Giả lập thời gian quét mã QR
        setTimeout(() => {
            // Hiện popup xác nhận
            setShowPopup(true);
            // Xóa toàn bộ dữ liệu giỏ hàng và đơn hàng cục bộ để CartPage rỗng
            clearCartData();
            // Thông báo cho các component khác nếu cần
            window.dispatchEvent(new Event('cartUpdated'));
        }, 1000); // Delay giả lập
    };

    return (
        <div className="container mt-5">
            <div className="qr-flex-card shadow-lg">
                {/* Cột trái */}
                <div className="qr-left">
                    <img src={Logo} alt="Logo" className="qr-brand-logo mb-3" />
                    <h4 className="mb-2">Quét mã QR để nạp tiền</h4>
                    {/* Hướng dẫn sử dụng */}
                    <div className="qr-guide mb-3">
                        <strong>Hướng dẫn sử dụng:</strong>
                        <ol style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                            <li>Mở ứng dụng ngân hàng trên điện thoại của bạn.</li>
                            <li>Chọn chức năng quét mã QR.</li>
                            <li>Đưa camera điện thoại hướng vào mã QR bên phải màn hình.</li>
                            <li>Kiểm tra kỹ thông tin chuyển khoản (số tiền, nội dung, tài khoản nhận).</li>
                            <li>Thực hiện chuyển khoản theo hướng dẫn trên ứng dụng ngân hàng.</li>
                            <li>Sau khi hoàn tất, nhấn nút "Tôi đã quét xong" để xác nhận.</li>
                        </ol>
                    </div>
                    <div className="qr-desc mb-3">
                        Sử dụng ứng dụng ngân hàng để quét mã QR và chuyển tiền tự động.<br />
                        Vui lòng kiểm tra kỹ thông tin trước khi xác nhận giao dịch.
                    </div>
                    <button className="btn btn-secondary mt-2" onClick={() => window.history.back()}>
                        Quay lại
                    </button>

                    {/* Nút giả lập "Tôi đã quét xong" */}
                    {!loading && (
                        <button className="btn btn-success mt-3" onClick={handleQRScan}>
                            Tôi đã quét xong
                        </button>
                    )}
                </div>

                {/* Cột phải */}
                <div className="qr-right">
                    <div className="qr-img-wrapper mb-3">
                        {loading && (
                            <div className="qr-loading">
                                <div className="spinner"></div>
                                <span>Đang tải mã QR...</span>
                            </div>
                        )}
                        <img
                            src={QRImage}
                            alt="QR Thanh toán"
                            style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: loading ? 'none' : 'block' }}
                            onLoad={() => setLoading(false)} // Chỉ ẩn loading, không hiện popup
                            className="qr-img"
                        />
                    </div>
                </div>
            </div>

            {/* Popup Confirmation */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h4>Xác nhận giao dịch</h4>
                        <p>Giao dịch nạp tiền đã được thực hiện thành công!</p>
                        <button className="btn btn-confirm" onClick={handleConfirm}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRPage;
