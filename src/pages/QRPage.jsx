import React, { useEffect, useState } from 'react';
import '../styles/QRPage.scss';

const QRPage = () => {
    const [paymentUrl, setPaymentUrl] = useState('');

    useEffect(() => {
        const url = localStorage.getItem('qrPaymentUrl');
        if (url) {
            setPaymentUrl(url);
        }
    }, []);

    return (
        <div className="container mt-5">
            <div className="card text-center p-4 shadow-lg">
                <h4 className="mb-4">Quét mã QR để thanh toán</h4>
                {paymentUrl ? (
                    <iframe
                        src={paymentUrl}
                        title="VNPay QR"
                        width="100%"
                        height="600px"
                        frameBorder="0"
                    />
                ) : (
                    <p className="text-danger">Không tìm thấy liên kết thanh toán.</p>
                )}
                <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>
                    Quay lại
                </button>
            </div>
        </div>
    );
};

export default QRPage;
