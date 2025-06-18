import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.jpg';
import '../styles/Navbar.scss';

const Navbar = () => {
    const searchRef = useRef();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const truncateEmail = (email) => {
        if (!email) return '';
        const [username, domain] = email.split('@');
        if (username.length > 10) {
            return `${username.substring(0, 10)}...@${domain}`;
        }
        return email;
    };

    useEffect(() => {
        // Check if user is logged in by checking for token
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        if (token && email) {
            setIsLoggedIn(true);
            setUserEmail(email);
        } else {
            setIsLoggedIn(false);
            setUserEmail('');
        }
    }, []);

    const handleSearch = () => {
        const query = searchRef.current.value.trim();
        if (query) {
            console.log("Searching for:", query);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
        navigate('/');
    };

    const handleSetting = () => {
        // Placeholder for settings navigation or action
        console.log("Navigating to settings");
        navigate('/settings'); // Adjust the route as needed
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                {/* Logo and Title */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={Logo} alt="Logo" className="navbar-logo" />
                    <span className="navbar-title">BellaVita</span>
                </Link>

                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Centered links */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item"><Link className="nav-link" to="/">Trang chủ</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/upgrade">Nâng cấp</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">Về chúng tôi</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/product">Sản phẩm</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/discount">Khuyến mãi</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cart">Kiểm tra đơn hàng</Link></li>
                    </ul>
                </div>

                {/* Right: search + user info/buttons */}
                <div className="d-flex align-items-center gap-2">
                    <div className="input-group search-box">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            ref={searchRef}
                        />
                        <button className="btn btn-search" onClick={handleSearch}>
                            <i className="bi bi-search text-white"></i>
                        </button>
                    </div>
                    {isLoggedIn ? (
                        <div className="dropdown">
                            <button
                                className="btn btn-user d-flex align-items-center gap-3"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div className="user-avatar">
                                    <i className="bi bi-person-circle fs-3"></i>
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <span className="user-email">{truncateEmail(userEmail)}</span>
                                    <small className="text-muted user-role">Khách hàng</small>
                                </div>
                                <i className="bi bi-chevron-down ms-2 text-muted"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li className="dropdown-header">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="user-avatar-small">
                                            <i className="bi bi-person-circle"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">{userEmail}</div>
                                            <small className="text-muted">Tài khoản của bạn</small>
                                        </div>
                                    </div>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center py-2" onClick={handleSetting}>
                                        <div className="dropdown-icon-wrapper">
                                            <i className="bi bi-gear-fill"></i>
                                        </div>
                                        <div className="ms-2">
                                            <span>Cài đặt</span>
                                            <small className="d-block text-muted">Quản lý tài khoản</small>
                                        </div>
                                    </button>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center py-2 text-danger" onClick={handleLogout}>
                                        <div className="dropdown-icon-wrapper">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </div>
                                        <div className="ms-2">
                                            <span>Đăng xuất</span>
                                            <small className="d-block text-muted">Thoát khỏi tài khoản</small>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-login">Đăng nhập</Link>
                            <Link to="/signup" className="btn btn-signup">Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;