import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductPage.scss';
import Image from '../images/Images.webp';

const ProductPage = () => {
    const itemsPerPage = 12;

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch categories
                const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
                setCategories(categoriesResponse.data || []);

                // Fetch products
                const productsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(productsResponse.data || []);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(product => product.category_id === parseInt(activeCategory));

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages.map((page, index) =>
            page === '...' ? (
                <li key={index} className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            ) : (
                <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handleClick(page)}>{page}</button>
                </li>
            )
        );
    };

    if (loading) {
        return (
            <div className="productpage container py-5" style={{ marginTop: '60px', paddingLeft: '40px', paddingRight: '40px' }}>
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p className="mt-2">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="productpage container py-5" style={{ marginTop: '60px', paddingLeft: '40px', paddingRight: '40px' }}>
            <div className="section mb-5">
                <div className="category-tabs d-flex justify-content-center gap-3 mb-5 flex-wrap">
                    <button
                        className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveCategory('all');
                            setCurrentPage(1);
                        }}
                    >
                        Tất cả
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.category_id}
                            className={`category-btn ${activeCategory === category.category_id.toString() ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(category.category_id.toString());
                                setCurrentPage(1);
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <h2 className="section-header text-left mb-4">Tất cả sản phẩm</h2>

                <div className="row gx-4 gy-4">
                    {currentProducts.map((product, idx) => (
                        <div className="col-md-3" key={product.id || idx}>
                            <div
                                className="custom-card text-center p-2"
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/product/${product.product_id}`)}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={product.image || Image}
                                        alt={product.name}
                                        className="card-image img-fluid"
                                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        backgroundColor: '#e60023',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        borderRadius: '4px'
                                    }}>
                                        -40%
                                    </div>
                                </div>
                                <h6 className="mt-2" style={{ fontSize: '14px', marginBottom: '4px' }}>{product.name}</h6>
                                <div className="mt-1" style={{ marginBottom: '4px' }}>
                                    <span style={{ color: '#e60023', fontWeight: 'bold', fontSize: '16px' }}>
                                        {Math.round(product.price)?.toLocaleString()} đ
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/${product.product_id}`);
                                        }}
                                    >
                                        MUA NGAY
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination-container mt-5 d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            <li className="page-item"><button className="page-link" onClick={() => handleClick(1)}>&laquo;</button></li>
                            <li className="page-item"><button className="page-link" onClick={() => handleClick(currentPage - 1)}>&lt;</button></li>
                            {renderPageNumbers()}
                            <li className="page-item"><button className="page-link" onClick={() => handleClick(currentPage + 1)}>&gt;</button></li>
                            <li className="page-item"><button className="page-link" onClick={() => handleClick(totalPages)}>&raquo;</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
