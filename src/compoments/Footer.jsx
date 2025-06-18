import React from 'react';
import '../styles/Footer.scss';
import { FaFacebookF, FaInstagram, FaGoogle, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Company Info Section */}
                <div className="footer-section company-info">
                    <div className="logo-section">
                        <h3>BellaVita</h3>
                        <p className="tagline">Làm đẹp tự nhiên, khỏe mạnh từ trong ra ngoài</p>
                    </div>
                    <p className="address">
                        <FaMapMarkerAlt className="icon-small" />
                        123 Đường ABC, Quận 1, TP.HCM
                    </p>
                    <button className="btn-primary">
                        Mua sắm ngay <FaArrowRight className="icon-small" />
                    </button>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h6>Dịch Vụ</h6>
                    <ul className="footer-links">
                        <li><a href="#">Chăm sóc da mặt</a></li>
                        <li><a href="#">Trang điểm</a></li>
                        <li><a href="#">Chăm sóc cơ thể</a></li>
                        <li><a href="#">Tư vấn làm đẹp</a></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-section">
                    <h6>Hỗ Trợ</h6>
                    <ul className="footer-links">
                        <li><a href="#">Hướng dẫn sử dụng</a></li>
                        <li><a href="#">Câu hỏi thường gặp</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Điều khoản sử dụng</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section contact-info">
                    <h6>Liên Hệ</h6>
                    <div className="contact-item">
                        <FaPhone className="icon-small" />
                        <span>+84 123 456 789</span>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="icon-small" />
                        <a href="mailto:contact@bellavita.vn">contact@bellavita.vn</a>
                    </div>
                    <div className="contact-item">
                        <FaMapMarkerAlt className="icon-small" />
                        <span>Giờ làm việc: 8:00 - 20:00</span>
                    </div>

                    <div className="social-section">
                        <h6>Theo dõi chúng tôi</h6>
                        <div className="footer-social-icons">
                            <a href="#" className="social-icon facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="social-icon instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="social-icon google">
                                <FaGoogle />
                            </a>
                            <a href="#" className="social-icon twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2024 BellaVita. Tất cả quyền được bảo lưu.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Chính sách bảo mật</a>
                        <a href="#">Điều khoản sử dụng</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;