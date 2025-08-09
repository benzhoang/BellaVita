import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailProductPage.scss';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
                setProduct(response.data);

                // Fetch category name if category_id exists
                if (response.data.category_id) {
                    try {
                        const categoryResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories/${response.data.category_id}`);
                        setCategoryName(categoryResponse.data.name);
                    } catch (categoryError) {
                        console.error("Lỗi khi fetch danh mục:", categoryError);
                        setCategoryName('Chưa phân loại');
                    }
                } else {
                    setCategoryName('Chưa phân loại');
                }

                setLoading(false);

                // Fetch all products and get 4 random related products
                const allProductsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                const filteredProducts = allProductsResponse.data.filter(p => p.id !== id);
                const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
                setRelatedProducts(shuffledProducts.slice(0, 4));
            } catch (error) {
                console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const createOrder = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!token || !userId) {
                alert('Vui lòng đăng nhập để tiếp tục.');
                // Lưu đường dẫn hiện tại để quay lại sau khi đăng nhập
                localStorage.setItem('redirectAfterLogin', `/product/${id}`);
                navigate('/login');
                return null;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    user_id: userId,
                    payment_method: "VNPAY",
                    orderItems: [{ product_id: id, quantity: quantity }]
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            localStorage.setItem('orderId', response.data.order_id);
            return response.data;
        } catch (error) {
            console.error('Order API error:', error);
            toast.error('Không thể thêm sản phẩm vào giỏ hàng.', { autoClose: 2000 });
            return null;
        }
    };

    const handleBuyNow = async () => {
        const result = await createOrder();
        if (result) {
            toast.success('Đã thêm sản phẩm vào giỏ hàng!', { autoClose: 1000 });
            setTimeout(() => navigate('/cart'), 1200);
        }
    };

    const handleAddToCart = async () => {
        const result = await createOrder();
        if (result) {
            toast.success('Đã thêm sản phẩm vào giỏ hàng!', { autoClose: 1000 });
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p>Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="not-found-container">
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <button className="btn btn-primary" onClick={() => navigate('/product')}>
                    Xem các sản phẩm khác
                </button>
            </div>
        );
    }

    const rating = 4.5;
    const reviewCount = 28;
    const discountPercent = 40;
    const originalPrice = product.price;
    const discountedPrice = originalPrice * (1 - discountPercent / 100);

    const thumbnailImages = [
        product.image_url || '/images/Images.webp',
        product.image_url || '/images/Images.webp',
        product.image_url || '/images/Images.webp',
        product.image_url || '/images/Images.webp',
    ];

    return (
        <div className="detail-product-page">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="container">
                <nav aria-label="breadcrumb" className="product-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item"><a href="/product">Sản phẩm</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                    </ol>
                </nav>

                <div className="product-main-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product-gallery">
                                <div className="main-image-container">
                                    <img
                                        src={product.image_url || '/images/Images.webp'}
                                        alt={product.name}
                                        className="main-product-image"
                                    />
                                    {discountPercent > 0 && (
                                        <div className="discount-badge">-{discountPercent}%</div>
                                    )}
                                </div>
                                <div className="thumbnail-gallery">
                                    {thumbnailImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            className={`thumbnail ${index === 0 ? 'active' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="product-info">
                                <h1 className="product-title">{product.name}</h1>

                                <div className="product-meta">
                                    <div className="product-rating">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(rating)
                                                ? <FaStar key={i} className="star filled" />
                                                : i < rating
                                                    ? <FaStar key={i} className="star half-filled" />
                                                    : <FaRegStar key={i} className="star" />
                                        ))}
                                        <span className="rating-value">{rating}</span>
                                        <span className="rating-count">({reviewCount} đánh giá)</span>
                                    </div>
                                    <div className="product-sku">
                                        <span className="label">Mã sản phẩm:</span>
                                        <span className="value">SKU-{id.padStart(6, '0')}</span>
                                    </div>
                                    <div className="product-availability in-stock">
                                        <span className="label">Tình trạng:</span>
                                        <span className="value">Còn hàng</span>
                                    </div>
                                </div>

                                <div className="product-price-container">
                                    <div className="current-price">{Math.round(discountedPrice).toLocaleString()} đ</div>
                                    {discountPercent > 0 && (
                                        <div className="original-price">{Math.round(originalPrice).toLocaleString()} đ</div>
                                    )}
                                </div>

                                <div className="product-short-description">
                                    <p>{product.description || 'Không có mô tả ngắn cho sản phẩm này.'}</p>
                                </div>

                                <div className="product-actions">
                                    <div className="quantity-selector">
                                        <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                                        <input type="number" value={quantity} min="1" readOnly />
                                        <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
                                    </div>

                                    <div className="action-buttons">
                                        <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
                                            <FaShoppingCart /> Thêm vào giỏ hàng
                                        </button>
                                        <button className="btn btn-buy-now" onClick={handleBuyNow}>
                                            MUA NGAY
                                        </button>
                                    </div>
                                </div>

                                <div className="product-extra-actions">
                                    <button className="btn-wishlist">
                                        <FaHeart /> Yêu thích
                                    </button>
                                    <button className="btn-share">
                                        <FaShare /> Chia sẻ
                                    </button>
                                </div>

                                <div className="product-category-tag">
                                    <div className="product-category">
                                        <span className="label">Danh mục:</span>
                                        <a href={`/product?category=${categoryName}`} className="value">{categoryName}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-details-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Mô tả chi tiết
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specifications')}
                        >
                            Thông số kỹ thuật
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Đánh giá ({reviewCount})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-pane">
                                <h3>Thông tin sản phẩm</h3>
                                <p>{product.description || 'Chưa có thông tin chi tiết cho sản phẩm này.'}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="tab-pane">
                                <h3>Thông số kỹ thuật</h3>
                                <table className="specs-table">
                                    <tbody>
                                        <tr>
                                            <td>Thương hiệu</td>
                                            <td>BellaVita</td>
                                        </tr>
                                        <tr>
                                            <td>Xuất xứ</td>
                                            <td>Việt Nam</td>
                                        </tr>
                                        <tr>
                                            <td>Chất liệu</td>
                                            <td>Cao cấp</td>
                                        </tr>
                                        <tr>
                                            <td>Kích thước</td>
                                            <td>Tiêu chuẩn</td>
                                        </tr>
                                        <tr>
                                            <td>Bảo hành</td>
                                            <td>12 tháng</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-pane">
                                <h3>Đánh giá từ khách hàng</h3>
                                <div className="review-summary">
                                    <div className="rating-average">
                                        <div className="average-score">{rating}</div>
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                i < Math.floor(rating)
                                                    ? <FaStar key={i} className="star filled" />
                                                    : i < rating
                                                        ? <FaStar key={i} className="star half-filled" />
                                                        : <FaRegStar key={i} className="star" />
                                            ))}
                                        </div>
                                        <div className="total-reviews">Dựa trên {reviewCount} đánh giá</div>
                                    </div>
                                </div>

                                <div className="review-list">
                                    <div className="review-item">
                                        <div className="reviewer-info">
                                            <div className="avatar">NT</div>
                                            <div className="name">Nguyễn Thị A</div>
                                        </div>
                                        <div className="review-content">
                                            <div className="rating">
                                                {[...Array(5)].map((_, i) => (
                                                    i < 5 ? <FaStar key={i} className="star filled" /> : <FaRegStar key={i} className="star" />
                                                ))}
                                                <span className="date">12/08/2023</span>
                                            </div>
                                            <p>Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh. Tôi rất hài lòng với chất lượng!</p>
                                        </div>
                                    </div>

                                    <div className="review-item">
                                        <div className="reviewer-info">
                                            <div className="avatar">VD</div>
                                            <div className="name">Vũ Đức B</div>
                                        </div>
                                        <div className="review-content">
                                            <div className="rating">
                                                {[...Array(5)].map((_, i) => (
                                                    i < 4 ? <FaStar key={i} className="star filled" /> : <FaRegStar key={i} className="star" />
                                                ))}
                                                <span className="date">05/07/2023</span>
                                            </div>
                                            <p>Sản phẩm đúng như mô tả, giá cả hợp lý. Sẽ mua lại lần sau.</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-outline-primary load-more-reviews">
                                    Xem thêm đánh giá
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="related-products">
                    <h3 className="section-title">Sản phẩm liên quan</h3>
                    <div className="row">
                        {relatedProducts.map(product => (
                            <div className="col-md-3" key={product.id}>
                                <Link to={`/product/${product.product_id}`} className="product-card">
                                    <div className="product-image">
                                        <img src={product.image_url || '/images/Images.webp'} alt={product.name} />
                                    </div>
                                    <div className="product-info">
                                        <h5 className="product-name">{product.name}</h5>
                                        <div className="product-price">
                                            <span className="current-price">{Math.round(product.price * (1 - 0.4)).toLocaleString()} đ</span>
                                            <span className="original-price">{Math.round(product.price).toLocaleString()} đ</span>
                                        </div>
                                        <div className="product-rating">
                                            {[...Array(5)].map((_, i) => (
                                                i < Math.floor(4.5)
                                                    ? <FaStar key={i} className="star filled" />
                                                    : i < 4.5
                                                        ? <FaStar key={i} className="star half-filled" />
                                                        : <FaRegStar key={i} className="star" />
                                            ))}
                                            <span className="rating-count">(15)</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProductPage;