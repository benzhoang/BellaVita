import React from 'react';
import '../styles/Footer.scss';
import { FaFacebookF, FaInstagram, FaGoogle, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h6>BellaVita</h6>
                    <p>Địa chỉ: xxxxxxxxxxxxxxxx</p>
                    <button className="btn">Đi ngay</button>
                </div>
                <div className="footer-section">
                    <h6>Về Chúng Tôi</h6>
                    <p><a href="#">Trang chủ</a></p>
                    <p><a href="#">Sản phẩm</a></p>
                    <p><a href="#">Câu hỏi</a></p>
                </div>
                <div className="footer-section">
                    <h6>Điều Khoản</h6>
                    <p><a href="#">Điều khoản sử dụng</a></p>
                    <p><a href="#">Hướng dẫn mua hàng</a></p>
                    <p><a href="#">Giao hàng và đổi trả</a></p>
                    <p><a href="#">Chính sách bảo mật</a></p>
                </div>
                <div className="footer-section">
                    <h6>Liên Hệ</h6>
                    <p>Điện thoại: +0123456789</p>
                    <p><a href="mailto:contact@summer.vn">contact@summer.vn</a></p>
                    <div className="footer-social-icons">
                        <FaFacebookF className="icon" />
                        <FaInstagram className="icon" />
                        <FaGoogle className="icon" />
                        <FaTwitter className="icon" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;