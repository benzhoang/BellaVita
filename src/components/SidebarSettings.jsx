import React from 'react';
import '../styles/SidebarSettings.scss'; // Assuming you have a CSS file for styling
import { Nav } from 'react-bootstrap';
import { FaUser, FaHistory, FaHeart } from 'react-icons/fa';

const SidebarSettings = () => {
    return (
        <div className="sidebar-settings">
            <div className="sidebar-header">
                <img src="/Logo.jpg" alt="Avatar" className="sidebar-avatar" />
                <div className="sidebar-title">Tài khoản của bạn</div>
            </div>
            <Nav className="flex-column sidebar-nav">
                <Nav.Link href="/profile" className="sidebar-item">
                    <FaUser className="sidebar-icon" />
                    <span>Hồ sơ</span>
                </Nav.Link>
                <Nav.Link href="/order-history" className="sidebar-item">
                    <FaHistory className="sidebar-icon" />
                    <span>Lịch sử hóa đơn</span>
                </Nav.Link>
                <Nav.Link href="/favorites" className="sidebar-item">
                    <FaHeart className="sidebar-icon" />
                    <span>Sản phẩm đã thích</span>
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default SidebarSettings;