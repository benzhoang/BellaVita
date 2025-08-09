import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.jpg';
import '../styles/Navbar.scss';

const Navbar = () => {
    const searchRef = useRef();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef();

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

    // Fetch products and categories when searchQuery changes
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults({ products: [], categories: [] });
                setShowDropdown(false);
                return;
            }

            try {
                // Fetch products
                const productResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                if (!productResponse.ok) {
                    throw new Error('Failed to fetch products');
                }
                const products = await productResponse.json();

                // Fetch categories
                const categoryResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categories = await categoryResponse.json();

                // Filter products and categories based on the search query (case-insensitive)
                const filteredProducts = products.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const filteredCategories = categories.filter((category) =>
                    category.name.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setSearchResults({ products: filteredProducts, categories: filteredCategories });
                setShowDropdown(filteredProducts.length > 0 || filteredCategories.length > 0);
            } catch (error) {
                console.error('Error fetching data:', error);
                setSearchResults({ products: [], categories: [] });
                setShowDropdown(false);
            }
        };

        // Debounce the API call to avoid excessive requests
        const debounce = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchQuery]);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const query = searchRef.current.value.trim();
        if (query) {
            // Check if the query exactly matches a category name
            const matchedCategory = searchResults.categories.find(
                (category) => category.name.toLowerCase() === query.toLowerCase()
            );
            if (matchedCategory) {
                // Navigate to ProductPage with the matched category
                setShowDropdown(false);
                setSearchQuery('');
                searchRef.current.value = '';
                navigate(`/product?category_id=${matchedCategory.category_id}`);
            } else {
                // Navigate to a search results page for products
                navigate(`/search?query=${encodeURIComponent(query)}`);
                setShowDropdown(false);
            }
        }
    };

    const handleProductClick = (product) => {
        setShowDropdown(false);
        setSearchQuery('');
        searchRef.current.value = '';
        navigate(`/product/${product.product_id}`);
    };

    const handleCategoryClick = (category) => {
        setShowDropdown(false);
        setSearchQuery('');
        searchRef.current.value = '';
        navigate(`/product?category_id=${category.category_id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('orderId');
        setIsLoggedIn(false);
        setUserEmail('');
        navigate('/');
    };

    const handleSetting = () => {
        navigate('/settings');
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
                    <div className="input-group search-box d-lg-none mt-3 mb-2" ref={dropdownRef}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            ref={searchRef}
                            onChange={handleSearchInput}
                        />
                        <button className="btn btn-search" onClick={handleSearch}>
                            <i className="bi bi-search text-white"></i>
                        </button>
                        {showDropdown && (
                            <ul className="dropdown-menu show w-100 mt-1">
                                {searchResults.categories.map((category) => (
                                    <li key={`category-${category.category_id}`}>
                                        <button
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            <span className="search-category-name">[Category] {category.name}</span>
                                        </button>
                                    </li>
                                ))}
                                {searchResults.products.map((product) => (
                                    <li key={`product-${product.product_id}`}>
                                        <button
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={() => handleProductClick(product)}
                                        >
                                            <img
                                                src={product.image_url || '/images/Images.webp'}
                                                alt={product.name}
                                                className="search-product-image"
                                            />
                                            <span className="search-product-name">[Product] {product.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
                    <div className="input-group search-box d-none d-lg-flex" ref={dropdownRef}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            ref={searchRef}
                            onChange={handleSearchInput}
                        />
                        <button className="btn btn-search" onClick={handleSearch}>
                            <i className="bi bi-search text-white"></i>
                        </button>
                        {showDropdown && (
                            <ul className="dropdown-menu show w-100 mt-1">
                                {searchResults.categories.map((category) => (
                                    <li key={`category-${category.category_id}`}>
                                        <button
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            <span className="search-category-name">[Category] {category.name}</span>
                                        </button>
                                    </li>
                                ))}
                                {searchResults.products.map((product) => (
                                    <li key={`product-${product.product_id}`}>
                                        <button
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={() => handleProductClick(product)}
                                        >
                                            <img
                                                src={product.image_url || '/images/Images.webp'}
                                                alt={product.name}
                                                className="search-product-image"
                                            />
                                            <span className="search-product-name">[Product] {product.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
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