import { useState, useEffect } from 'react';
import '../styles/CartPage.scss';
import Images from '../images/Images.webp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    getCartFromStorage, 
    saveCartToStorage, 
    updateCartItemQuantity, 
    saveLastOrder,
    getLastOrder,
    saveCustomerInfo,
    getCustomerInfo
} from '../utils/cartUtils';

const CartPage = () => {
    const navigate = useNavigate();


    const [customerInfo, setCustomerInfo] = useState(getCustomerInfo());
    const [discountCode, setDiscountCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("Nhanh");
    const [tempShippingMethod, setTempShippingMethod] = useState(shippingMethod);
    const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
    const [isShippingPopupOpen, setIsShippingPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productDetails, setProductDetails] = useState({});

    // Fetch product details từ API
    const fetchProductDetails = async (productIds) => {
        try {
            const promises = productIds.map(id => 
                axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            );
            const responses = await Promise.all(promises);
            const details = {};
            responses.forEach((response, index) => {
                details[productIds[index]] = response.data;
            });
            setProductDetails(details);
        } catch (error) {
            console.error('Lỗi khi fetch chi tiết sản phẩm:', error);
        }
    };

    // Bỏ reloadOrder vì không còn hành động xóa trong bảng đơn hàng

    // Đã bỏ nút xóa sản phẩm khỏi đơn hàng nên không dùng API xóa nữa

    // Cập nhật thông tin khách hàng
    const updateCustomerInfo = (field, value) => {
        const updatedInfo = { ...customerInfo, [field]: value };
        setCustomerInfo(updatedInfo);
        saveCustomerInfo(updatedInfo);
    };

    // Validation thông tin khách hàng
    const validateCustomerInfo = () => {
        const errors = [];
        
        if (!customerInfo.name.trim()) {
            errors.push('Vui lòng nhập họ và tên');
        }
        
        if (!customerInfo.address.trim()) {
            errors.push('Vui lòng nhập địa chỉ nhận hàng');
        }
        
        if (!customerInfo.phone.trim()) {
            errors.push('Vui lòng nhập số điện thoại');
        } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
            errors.push('Số điện thoại không hợp lệ');
        }
        
        return errors;
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = updateCartItemQuantity(productId, newQuantity);
        setCartItems(updatedCart);
        // Dispatch event để Navbar cập nhật số lượng
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Đã bỏ chức năng xóa sản phẩm khỏi giỏ hàng (theo yêu cầu)

    // Tính tổng tiền giỏ hàng
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const productDetail = productDetails[item.product_id];
            const price = productDetail?.price || item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    // Chuyển giỏ hàng thành đơn hàng
    const convertCartToOrder = async () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }

        // Validation thông tin khách hàng
        const validationErrors = validateCustomerInfo();
        if (validationErrors.length > 0) {
            alert('Vui lòng kiểm tra lại thông tin:\n' + validationErrors.join('\n'));
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để thanh toán!');
            navigate('/login');
            return;
        }

        try {
            const orderData = {
                customer_name: customerInfo.name,
                customer_address: customerInfo.address,
                customer_phone: customerInfo.phone,
                items: cartItems,
                total_amount: getCartTotal(),
                shipping_method: shippingMethod,
                payment_method: 'COD' // Mặc định thanh toán khi nhận hàng
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                // Xóa giỏ hàng sau khi tạo đơn hàng thành công
                setCartItems([]);
                saveCartToStorage([]);
                localStorage.setItem('orderId', response.data.order_id);
                setOrderData(response.data);
                // Lưu đơn hàng gần nhất
                saveLastOrder(response.data);
                // Dispatch event để Navbar cập nhật số lượng về 0
                window.dispatchEvent(new Event('cartUpdated'));
                alert('Đơn hàng đã được tạo thành công!');
            }
        } catch (error) {
            console.error('Lỗi tạo đơn hàng:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng!');
        }
    };

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // Lấy giỏ hàng từ localStorage
        const storedCart = getCartFromStorage();
        setCartItems(storedCart);
        
        // Fetch product details cho các sản phẩm trong giỏ hàng
        if (storedCart.length > 0) {
            const productIds = storedCart.map(item => item.product_id);
            fetchProductDetails(productIds);
        }

        // Lấy đơn hàng gần nhất từ localStorage
        const lastOrder = getLastOrder();
        if (lastOrder) {
            setOrderData(lastOrder);
            // Fetch product details cho order items
            if (lastOrder.orderItems && lastOrder.orderItems.length > 0) {
                const productIds = lastOrder.orderItems.map(item => item.product_id);
                fetchProductDetails(productIds);
            }
            setIsLoading(false);
            return;
        }

        // Nếu không có đơn hàng gần nhất, thử lấy từ API
        const id = localStorage.getItem('orderId');

        const fetchOrder = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data) {
                    setOrderData(response.data);
                    // Lưu đơn hàng gần nhất
                    saveLastOrder(response.data);
                    
                    // Fetch product details cho order items
                    if (response.data.orderItems && response.data.orderItems.length > 0) {
                        const productIds = response.data.orderItems.map(item => item.product_id);
                        fetchProductDetails(productIds);
                    }
                } else {
                    setOrderData(null);
                }
            } catch (error) {
                console.error('Lỗi lấy đơn hàng:', error);
                setOrderData(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (id && token) {
            fetchOrder();
        } else {
            console.log('Không tìm thấy orderId hoặc token trong localStorage');
            setOrderData(null);
            setIsLoading(false);
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

    const formatPrice = (value) => {
        if (isNaN(value)) return value;
        return Number(value).toLocaleString('vi-VN') + 'đ';
    };

    // Hiển thị giỏ hàng trống khi đã đăng nhập nhưng không có đơn hàng và giỏ hàng trống
    if (isLoggedIn && !orderData && !isLoading && cartItems.length === 0) {
        return (
            <div className="cart-page container py-6">
                <div className="empty-cart-container">
                    <h3 className="mb-4 fw-bold">Giỏ hàng</h3>
                    <div className="empty-cart-content">
                        <div className="empty-cart-message">
                            <p>Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy bắt đầu mua sắm!</p>
                        </div>
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-primary shop-now-btn" 
                                onClick={() => navigate('/product')}
                            >
                                Mua sắm ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Hiển thị thông báo chưa đăng nhập
    if (!isLoggedIn) {
        return (
            <div className="cart-page container py-6">
                <div className="empty-cart-container">
                    <h3 className="mb-4 fw-bold">Giỏ hàng</h3>
                    <div className="empty-cart-content">
                        <div className="empty-cart-message">
                            <p>Vui lòng đăng nhập để xem giỏ hàng của bạn!</p>
                        </div>
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-primary me-2" 
                                onClick={() => navigate('/login')}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Hiển thị giỏ hàng từ localStorage khi có sản phẩm nhưng chưa có đơn hàng
    if (isLoggedIn && !orderData && !isLoading && cartItems.length > 0) {
        return (
            <div className="cart-page container py-6">
                <h3 className="mb-4 fw-bold">Giỏ hàng</h3>

                <div className="row">
                    <div className="col-md-12">
                        <div className="info-section mb-4">
                            <label>Họ và tên</label>
                            <div className="info-box">
                                <input 
                                    type="text" 
                                    value={customerInfo.name} 
                                    onChange={(e) => updateCustomerInfo('name', e.target.value)}
                                    placeholder="Nhập họ và tên của bạn"
                                />
                            </div>

                            <label>Địa chỉ nhận hàng</label>
                            <div className="info-box">
                                <input 
                                    type="text" 
                                    value={customerInfo.address} 
                                    onChange={(e) => updateCustomerInfo('address', e.target.value)}
                                    placeholder="Nhập địa chỉ nhận hàng"
                                />
                            </div>

                            <label>Số điện thoại</label>
                            <div className="info-box">
                                <input 
                                    type="tel" 
                                    value={customerInfo.phone} 
                                    onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="invoice-section mt-5">
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
                            {cartItems.map((item, idx) => {
                                const productDetail = productDetails[item.product_id];
                                return (
                                    <tr key={item.product_id || idx}>
                                        <td>
                                            <img 
                                                src={productDetail?.image_url || Images} 
                                                alt="product" 
                                                className="me-2"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                            {productDetail?.name || item.product_name || `Sản phẩm #${item.product_id}`}
                                        </td>
                                        <td>{formatPrice(productDetail?.price || item.price)}</td>
                                        <td>
                                            <div className="quantity-controls">
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>{formatPrice((productDetail?.price || item.price) * item.quantity)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="summary-section mb-4">
                        <div className="summary-row">
                            <div><strong>Mã giảm giá</strong></div>
                            <div><strong>Chi tiết</strong></div>
                            <div><strong>Giảm</strong></div>
                            <div className="text-end">
                                <a href="#" onClick={() => { setIsDiscountPopupOpen(true); setErrorMessage(""); }}>
                                    Nhập mã giảm giá
                                </a>
                            </div>
                            <div>MAGIAMGIA</div>
                            <div>20%</div>
                            <div>119.000đ</div>
                            <div></div>
                        </div>
                        <div className="summary-row">
                            <div></div>
                            <div><strong>Phương thức vận chuyển</strong></div>
                            <div><strong>{shippingMethod}</strong></div>
                            <div className="text-end">
                                <a href="#" onClick={(e) => { e.preventDefault(); setIsShippingPopupOpen(true); setTempShippingMethod(shippingMethod); }}>
                                    Thay đổi
                                </a>
                            </div>
                            <div></div>
                            <div>16.500đ</div>
                            <div></div>
                        </div>
                        <div className="text-end mt-3">
                            <p><strong>Tạm tính:</strong> {formatPrice(getCartTotal() + 16500)}</p>
                            <p><strong>Giảm giá:</strong> - 119.000đ</p>
                            <hr />
                            <p className="fs-5"><strong>Tổng số tiền:</strong> {formatPrice(getCartTotal() + 16500 - 119000)}</p>
                        </div>
                    </div>

                    <div className="button-section d-flex justify-content-end gap-2">
                        <button className="btn btn-success" onClick={convertCartToOrder}>Thanh toán</button>
                        <button className="btn btn-secondary" onClick={() => navigate('/product')}>Tiếp tục mua sắm</button>
                    </div>
                </div>

                {/* Modal Giảm giá */}
                <div className={`modal-backdrop ${isDiscountPopupOpen ? 'active' : ''}`} onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>
                    <div className={`modal ${isDiscountPopupOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
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

                {/* Modal Vận chuyển */}
                <div className={`modal-backdrop ${isShippingPopupOpen ? 'active' : ''}`} onClick={() => { setIsShippingPopupOpen(false); setErrorMessage(""); }}>
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
            </div>
        );
    }

    return (
        <div className="cart-page container py-6">
            <h3 className="mb-4 fw-bold">Thanh toán</h3>

            <div className="row">
                <div className="col-md-12">
                    <div className="info-section mb-4">
                        <label>Họ và tên</label>
                        <div className="info-box">
                            <input 
                                type="text" 
                                value={customerInfo.name} 
                                onChange={(e) => updateCustomerInfo('name', e.target.value)}
                                placeholder="Nhập họ và tên của bạn"
                            />
                        </div>

                        <label>Địa chỉ nhận hàng</label>
                        <div className="info-box">
                            <input 
                                type="text" 
                                value={customerInfo.address} 
                                onChange={(e) => updateCustomerInfo('address', e.target.value)}
                                placeholder="Nhập địa chỉ nhận hàng"
                            />
                        </div>

                        <label>Số điện thoại</label>
                        <div className="info-box">
                            <input 
                                type="tel" 
                                value={customerInfo.phone} 
                                onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="invoice-section mt-5">
                {isLoading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p className="mt-2">Đang tải thông tin đơn hàng...</p>
                    </div>
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
                                    orderData.orderItems.map((item, idx) => {
                                        const productDetail = productDetails[item.product_id];
                                        return (
                                            <tr key={item.order_item_id || idx}>
                                                <td>
                                                    <img 
                                                        src={productDetail?.image_url || Images} 
                                                        alt="product" 
                                                        className="me-2"
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    {productDetail?.name || item.product_name || `Sản phẩm #${item.product_id}`}
                                                </td>
                                                <td>{formatPrice(productDetail?.price || item.price)}</td>
                                                <td>{item.quantity}</td>
                                                <td>{formatPrice((productDetail?.price || item.price) * item.quantity)}</td>
                                            </tr>
                                        );
                                    })
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
                                <div className="text-end">
                                    <a href="#" onClick={() => { setIsDiscountPopupOpen(true); setErrorMessage(""); }}>
                                        Nhập mã giảm giá
                                    </a>
                                </div>
                                <div>MAGIAMGIA</div>
                                <div>20%</div>
                                <div>119.000đ</div>
                                <div></div>
                            </div>
                            <div className="summary-row">
                                <div></div>
                                <div><strong>Phương thức vận chuyển</strong></div>
                                <div><strong>{shippingMethod}</strong></div>
                                <div className="text-end">
                                    <a href="#" onClick={(e) => { e.preventDefault(); setIsShippingPopupOpen(true); setTempShippingMethod(shippingMethod); }}>
                                        Thay đổi
                                    </a>
                                </div>
                                <div></div>
                                <div>16.500đ</div>
                                <div></div>
                            </div>
                            <div className="text-end mt-3">
                                <p><strong>Tạm tính:</strong> {formatPrice(
                                    orderData.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                                    (orderData.shipping_fee || 16500)
                                )}</p>
                                <p><strong>Giảm giá:</strong> - 119.000đ</p>
                                <hr />
                                <p className="fs-5"><strong>Tổng số tiền:</strong> {formatPrice(orderData.total_amount)}</p>
                            </div>
                        </div>

                        <div className="row payment-delivery mt-4">
                            <div className="col-md-6">
                                <label>Phương thức thanh toán</label>
                                <div className="info-box">{orderData.payment_method}</div>
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

            {/* Modal Giảm giá */}
            <div className={`modal-backdrop ${isDiscountPopupOpen ? 'active' : ''}`} onClick={() => { setIsDiscountPopupOpen(false); setErrorMessage(""); }}>
                <div className={`modal ${isDiscountPopupOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
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

            {/* Modal Vận chuyển */}
            <div className={`modal-backdrop ${isShippingPopupOpen ? 'active' : ''}`} onClick={() => { setIsShippingPopupOpen(false); setErrorMessage(""); }}>
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
        </div>
    );
};

export default CartPage;
