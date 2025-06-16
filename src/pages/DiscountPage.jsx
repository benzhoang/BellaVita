import '../styles/DiscountPage.scss';
import Card1 from '../images/card1.jpg';
import Banner4 from '../images/banner4.jpg';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const DiscountPage = () => {
    const productCarousel = (
        <div className="carousel-section">
            <div className="carousel-wrapper">
                <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={Banner4} className="image d-block w-100" alt="Slide 1" />
                            <div className="carousel-caption">
                                <h2>Khuyến Mãi Đặc Biệt</h2>
                                <p>Giảm giá lên đến 50% cho tất cả dịch vụ</p>
                                <button className="btn btn-light btn-lg mt-3">Xem Ngay</button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Banner4} className="image d-block w-100" alt="Slide 2" />
                            <div className="carousel-caption">
                                <h2>Chương Trình Mới</h2>
                                <p>Trải nghiệm dịch vụ cao cấp với giá ưu đãi</p>
                                <button className="btn btn-light btn-lg mt-3">Khám Phá</button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={Banner4} className="image d-block w-100" alt="Slide 3" />
                            <div className="carousel-caption">
                                <h2>Ưu Đãi Thành Viên</h2>
                                <p>Đặc quyền dành riêng cho khách hàng thân thiết</p>
                                <button className="btn btn-light btn-lg mt-3">Đăng Ký Ngay</button>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const productGrid = (
        <div className="discount-section">
            <div className="section-header text-center mb-5">
                <h2 className="section-title">Khuyến Mãi Nổi Bật</h2>
                <p className="section-description">Khám phá các chương trình ưu đãi hấp dẫn dành riêng cho bạn</p>
            </div>
            <div className="card-grid container">
                <div className="card-item">
                    <div className="card-image">
                        <img src={Card1} alt="Card 1" className="card-img" />
                        <div className="discount-badge">-50%</div>
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">
                            <a href="#">10.6 Siêu Sale Giờ Vàng - Giá Giảm Một Nửa</a>
                        </h3>
                        <div className="card-info">
                            <span className="date"><FaCalendarAlt /> 10/06/2024</span>
                            <span className="time"><FaClock /> Còn 2 ngày</span>
                        </div>
                        <p className="card-description">Ưu đãi đặc biệt dành cho khách hàng trong giờ vàng</p>
                    </div>
                </div>
                <div className="card-item">
                    <div className="card-image">
                        <img src={Card1} alt="Card 2" className="card-img" />
                        <div className="discount-badge">-30%</div>
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">
                            <a href="#">Khai trương chi nhánh 261 - Đồng Xoài, Bình Phước</a>
                        </h3>
                        <div className="card-info">
                            <span className="date"><FaCalendarAlt /> 15/06/2024</span>
                            <span className="time"><FaClock /> Còn 7 ngày</span>
                        </div>
                        <p className="card-description">Chào mừng khai trương với nhiều ưu đãi hấp dẫn</p>
                    </div>
                </div>
                <div className="card-item">
                    <div className="card-image">
                        <img src={Card1} alt="Card 3" className="card-img" />
                        <div className="discount-badge">-60%</div>
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">
                            <a href="#">[HOT] Ưu đãi trải nghiệm làm đẹp đến hơn 60%</a>
                        </h3>
                        <div className="card-info">
                            <span className="date"><FaCalendarAlt /> 20/06/2024</span>
                            <span className="time"><FaClock /> Còn 12 ngày</span>
                        </div>
                        <p className="card-description">Trải nghiệm dịch vụ cao cấp với giá ưu đãi</p>
                    </div>
                </div>
                <div className="card-item">
                    <div className="card-image">
                        <img src={Card1} alt="Card 4" className="card-img" />
                        <div className="discount-badge">-40%</div>
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">
                            <a href="#">Unilever Nâng Niu Nét Đẹp Toàn Diện</a>
                        </h3>
                        <div className="card-info">
                            <span className="date"><FaCalendarAlt /> 25/06/2024</span>
                            <span className="time"><FaClock /> Còn 17 ngày</span>
                        </div>
                        <p className="card-description">Chương trình đặc biệt từ Unilever</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="discount-page">
            {productCarousel}
            {productGrid}
        </div>
    );
};

export default DiscountPage;
