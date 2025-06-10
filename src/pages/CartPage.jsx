import { useState } from 'react';
import '../styles/CartPage.scss';
import Images from '../images/Images.webp';

const CartPage = () => {
    const [name, setName] = useState("Nguyễn Văn A");
    const [address, setAddress] = useState("12 đường 31, phường Bình Nghĩa, quận 1, TP.HCM");
    const [phone, setPhone] = useState("0987654321");
    const [discountCode, setDiscountCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("Nhanh");
    const [tempShippingMethod, setTempShippingMethod] = useState(shippingMethod);
    const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
    const [isShippingPopupOpen, setIsShippingPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
                        <tr>
                            <td>
                                <img src={Images} alt="product" className="me-2" />
                                Bộ Đôi Dưỡng Sáng Trẻ Hóa Phục Hồi Da...
                            </td>
                            <td>599.000đ</td>
                            <td>1</td>
                            <td>599.000đ</td>
                        </tr>
                    </tbody>
                </table>

                <div className="summary-section mb-4">
                    <div className="summary-row">
                        <div><strong>Mã giảm giá</strong></div>
                        <div><strong>Chi tiết</strong></div>
                        <div><strong>Giảm</strong></div>
                        <div className="text-end"><a href="#" onClick={() => { setIsDiscountPopupOpen(true); setErrorMessage(""); }}>Nhập mã giảm giá</a></div>
                        <div>MAGIAMGIA</div>
                        <div>20%</div>
                        <div>119.000đ</div>
                        <div></div>
                    </div>

                    <div className="summary-row">
                        <div></div>
                        <div><strong>Phương thức vận chuyển</strong></div>
                        <div><strong>{shippingMethod}</strong></div>
                        <div className="text-end"><a href="#" onClick={() => { setIsShippingPopupOpen(true); setTempShippingMethod(shippingMethod); }}>Thay đổi</a></div>
                        <div></div>
                        <div></div>
                        <div>16.500đ</div>
                        <div></div>
                    </div>

                    <div className="text-end mt-3">
                        <p><strong>Tạm tính:</strong> 615.500đ</p>
                        <p><strong>Giảm giá:</strong> - 119.000đ</p>
                        <hr />
                        <p className="fs-5"><strong>Tổng số tiền:</strong> 496.500đ</p>
                    </div>
                </div>

                <div className="row payment-delivery mt-4">
                    <div className="col-md-6">
                        <label>Phương thức thanh toán</label>
                        <div className="info-box">VNPay <i className="bi bi-pencil-square edit-icon"></i></div>
                    </div>
                    <div className="col-md-6">
                        <label>Thời gian dự kiến giao hàng</label>
                        <div className="info-box">Từ ngày 23 đến ngày 28 tháng 12 năm 2100</div>
                    </div>
                </div>

                <div className="button-section d-flex justify-content-end gap-2">
                    <button className="btn btn-success">Thanh toán</button>
                    <button className="btn btn-danger">Hủy</button>
                </div>
            </div>

            <div className={`modal-backdrop ${isDiscountPopupOpen || isShippingPopupOpen ? 'active' : ''}`} onClick={() => { setIsDiscountPopupOpen(false); setIsShippingPopupOpen(false); setErrorMessage(""); }}></div>

            <div className={`modal ${isDiscountPopupOpen ? 'active' : ''}`}>
                <span className="close-btn" onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>×</span>
                <h4>Nhập mã giảm giá</h4>
                <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Nhập mã..."
                />
                <div className={`error ${errorMessage ? 'active' : ''}`}>{errorMessage}</div>
                <button onClick={handleDiscountSubmit}>Xác nhận</button>
                <button onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>Hủy</button>
            </div>

            <div className={`modal shipping-modal ${isShippingPopupOpen ? 'active' : ''}`}>
                <span className="close-btn" onClick={handleShippingCancel}>×</span>
                <div className="modal-content">
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
        </div >
    );
};

export default CartPage;