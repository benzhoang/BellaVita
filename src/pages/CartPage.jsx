import { useState, useEffect } from 'react';
import '../styles/CartPage.scss';
import Images from '../images/Images.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("Nguyễn Văn A");
    const [address, setAddress] = useState("12 đường 31, phường Bình Nghĩa, quận 1, TP.HCM");
    const [phone, setPhone] = useState("0987654321");
    const [discountCode, setDiscountCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("Nhanh");
    const [tempShippingMethod, setTempShippingMethod] = useState(shippingMethod);
    const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
    const [isShippingPopupOpen, setIsShippingPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Dữ liệu mẫu
    const sampleOrderData = {
        order_id: 'ORD-12345',
        payment_method: 'Thanh toán khi nhận hàng',
        shipping_fee: 16500,
        total_amount: 595000,
        orderItems: [
            {
                order_item_id: 1,
                product_id: 101,
                product_name: 'Sản phẩm mẫu 1',
                price: 299000,
                quantity: 1
            },
            {
                order_item_id: 2,
                product_id: 102,
                product_name: 'Sản phẩm mẫu 2',
                price: 399000,
                quantity: 1
            }
        ]
    };

    // Lấy đơn hàng từ API khi mount
    useEffect(() => {
        const id = localStorage.getItem('orderId');
        const token = localStorage.getItem('token');

        const fetchOrder = async () => {
            setIsLoading(true);
            try {
                // Sửa lại cấu trúc gọi API - headers phải nằm trong config object
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Order data:', response.data);
                if (response.data) {
                    setOrderData(response.data);
                } else {
                    // Nếu không có dữ liệu từ API, sử dụng dữ liệu mẫu
                    setOrderData(sampleOrderData);
                }
            } catch (error) {
                console.error('Lỗi lấy đơn hàng:', error);
                // Nếu có lỗi, sử dụng dữ liệu mẫu
                setOrderData(sampleOrderData);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        } else {
            console.log('Không tìm thấy orderId trong localStorage');
            // Nếu không có orderId, sử dụng dữ liệu mẫu sau 1 giây
            setTimeout(() => {
                setOrderData(sampleOrderData);
                setIsLoading(false);
            }, 1000);
        }
    }, []);

    const handleDiscountSubmit = () => {
        if (discountCode.trim() === "MAGIAMGIA") {
            console.log("Discount applied:", discountCode);
            setErrorMessage("");
            setIsDiscountPopupOpen(false);
        } else {
            setErrorMessage("Mã giảm giá không hợp lệ!");
        }
    };

    const handleShippingConfirm = () => {
        setShippingMethod(tempShippingMethod);
        setIsShippingPopupOpen(false);
    };

    const handleShippingCancel = () => {
        setTempShippingMethod(shippingMethod);
        setIsShippingPopupOpen(false);
    };

    // Hàm format số tiền
    const formatPrice = (value) => {
        if (isNaN(value)) return value;
        return Number(value).toLocaleString('vi-VN') + 'đ';
    };

    return (
        <div className="cart-page container py-6">
            <h3 className="mb-4 fw-bold">Thanh toán</h3>

            <div className="row">
                <div className="col-md-5">
                    <div className="info-section mb-4">
                        <label>Họ và tên</label>
                        <div className="info-box">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <label>Địa chỉ nhận hàng</label>
                        <div className="info-box">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <label>Số điện thoại</label>
                        <div className="info-box">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <iframe
                        className="map"
                        src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_API_KEY&q=Syracuse+NY"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <div className="invoice-section mt-5">
                <h5 className="mb-3">Hóa đơn</h5>
                {isLoading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p className="mt-2">Đang tải thông tin đơn hàng...</p>
                    </div>
                ) : !orderData ? (
                    <div>Không có đơn hàng nào đã được tạo</div>
                ) : (
                    <>
                        <div className="order-info mb-3">
                            <div><strong>Mã đơn hàng:</strong> {orderData.order_id}</div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.orderItems && orderData.orderItems.length > 0 ? (
                                    orderData.orderItems.map((item, idx) => (
                                        <tr key={item.order_item_id || idx}>
                                            <td>
                                                <img src={Images} alt="product" className="me-2" />
                                                {item.product_name || `Sản phẩm #${item.product_id}`}
                                            </td>
                                            <td>{formatPrice(item.price)}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(Number(item.price) * item.quantity)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">Không có sản phẩm nào trong đơn hàng</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="summary-section mb-4">
                            <div className="summary-row">
                                <div><strong>Mã giảm giá</strong></div>
                                <div><strong>Chi tiết</strong></div>
                                <div><strong>Giảm</strong></div>
                                <div className="text-end"><a href="#" onClick={() => { setIsDiscountPopupOpen(true); setErrorMessage(""); }}>Nhập mã giảm giá</a></div>
                                <div> MAGIAMGIA</div>
                                <div>20%</div>
                                <div>119.000đ</div>
                                <div></div>
                            </div>
                            <div className="summary-row">
                                <div></div>
                                <div><strong>Phương thức vận chuyển</strong></div>
                                <div><strong>{shippingMethod}</strong></div>
                                <div className="text-end"><a href="#" onClick={(e) => { e.preventDefault(); setIsShippingPopupOpen(true); setTempShippingMethod(shippingMethod); }}>Thay đổi</a></div>
                                <div></div>
                                <div>16.500đ</div>
                                <div></div>
                            </div>
                            <div className="text-end mt-3">
                                <p><strong>Tạm tính:</strong> {formatPrice(
                                    orderData.orderItems && orderData.orderItems.length > 0
                                        ? orderData.orderItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0) + (orderData.shipping_fee ? Number(orderData.shipping_fee) : 16500)
                                        : 0
                                )}</p>
                                <p><strong>Giảm giá:</strong> - 119.000đ</p>
                                <hr />
                                <p className="fs-5"><strong>Tổng số tiền:</strong> {formatPrice(orderData.total_amount || 0)}</p>
                            </div>
                        </div>
                        <div className="row payment-delivery mt-4">
                            <div className="col-md-6">
                                <label>Phương thức thanh toán</label>
                                <div className="info-box">{orderData.payment_method} <i className="bi bi-pencil-square edit-icon"></i></div>
                            </div>
                            <div className="col-md-6">
                                <label>Thời gian dự kiến giao hàng</label>
                                <div className="info-box">Từ ngày 23 đến ngày 28 tháng 7 năm 2025</div>
                            </div>
                        </div>
                        <div className="button-section d-flex justify-content-end gap-2">
                            <button className="btn btn-success" onClick={() => navigate('/payment')}>Thanh toán</button>
                            <button className="btn btn-danger">Hủy</button>
                        </div>
                    </>
                )}
            </div>

            <div className={`modal-backdrop ${isDiscountPopupOpen ? 'active' : ''}`} onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>
            <div className={`modal ${isDiscountPopupOpen ? 'active' : ''}`}>
                <div className='modal-content'>
                    <h4>Nhập mã giảm giá</h4>
                    <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Nhập mã..."
                    />
                    <div className={`error ${errorMessage ? 'active' : ''}`}>{errorMessage}</div>
                    <div className='button-container'>
                        <button className="fast-btn" onClick={handleDiscountSubmit}>Xác nhận</button>
                        <button className="slow-btn" onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>Hủy</button>
                    </div>
                </div>
            </div>
            </div>

            <div className={`modal-backdrop ${ isShippingPopupOpen ? 'active' : ''}`} onClick={() => { setIsShippingPopupOpen(false); setErrorMessage(""); }}>
            <div className={`modal shipping-modal ${isShippingPopupOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                <div className='modal-content'>
                    <h4>Chọn phương thức vận chuyển</h4>
                    <select
                        value={tempShippingMethod}
                        onChange={(e) => setTempShippingMethod(e.target.value)}
                    >
                        <option value="Nhanh">Nhanh</option>
                        <option value="Chậm">Chậm</option>
                    </select>
                    <div className="button-container">
                        <button className="fast-btn" onClick={handleShippingConfirm}>Xác nhận</button>
                        <button className="slow-btn" onClick={handleShippingCancel}>Hủy</button>
                    </div>
                </div>
            </div>
        </div>
          
        </div >
    );
};

export default CartPage;