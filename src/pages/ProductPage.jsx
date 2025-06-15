import React, { useState } from 'react';
import '../styles/ProductPage.scss';
import Image from '../images/Images.webp';

const ProductPage = () => {
    const itemsPerPage = 12;
    const totalProducts = 120;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'makeup', name: 'Trang điểm' },
        { id: 'skincare', name: 'Chăm sóc da' },
        { id: 'personal', name: 'Chăm sóc cá nhân' },
        { id: 'hair', name: 'Chăm sóc tóc' },
        { id: 'body', name: 'Chăm sóc body' }
    ];

    const sharedProductContent = {
        image: Image,
        discount: "-40%",
        title: "Bộ đôi Dưỡng Sáng Trẻ Hóa Phục Hồi Da - Niacinamide Essence & Hyaluronic Acid Essence",
        oldPrice: "1.000.000 đ",
        newPrice: "598.000 đ",
        buyText: "MUA NGAY",
        cartText: "Thêm vào giỏ hàng"
    };

    const allProducts = new Array(totalProducts).fill(null).map((_, index) => ({
        id: index + 1,
        ...sharedProductContent
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);

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

    return (
        <div className="productpage container py-5" style={{ marginTop: '60px', paddingLeft: '40px', paddingRight: '40px' }}>
            <div className="section mb-5">
                <div className="category-tabs d-flex justify-content-center gap-3 mb-5 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <h2 className="section-header text-left mb-4">Tất cả sản phẩm</h2>

                <div className="row gx-4 gy-4">
                    {currentProducts.map((product, idx) => (
                        <div className="col-md-3" key={idx}>
                            <div className="custom-card text-center p-2" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', padding: '8px' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={product.image} alt="product" className="card-image img-fluid" style={{ maxHeight: '200px', objectFit: 'contain' }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        backgroundColor: '#e60023',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        fontSize: '12px',
                                        borderRadius: '4px'
                                    }}>{product.discount}</div>
                                </div>
                                <h6 className="mt-2" style={{ fontSize: '14px', marginBottom: '4px' }}>{product.title}</h6>
                                <div className="mt-1" style={{ marginBottom: '4px' }}>
                                    <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>{product.oldPrice}</span>
                                    <span style={{ color: '#e60023', fontWeight: 'bold', fontSize: '16px', marginLeft: '6px' }}>{product.newPrice}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <button className="btn btn-outline-secondary btn-sm">{product.cartText}</button>
                                    <button className="btn btn-danger btn-sm">{product.buyText}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
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
