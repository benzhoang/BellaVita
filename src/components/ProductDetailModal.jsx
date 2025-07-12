import React from 'react';
import '../styles/ProductDetailModal.scss';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="product-detail-modal-overlay" onClick={onClose}>
            <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} aria-label="Đóng">&times;</button>
                <h2 className="modal-title">Chi tiết sản phẩm</h2>
                <div className="product-detail-content">
                    <div className="product-image-wrapper">
                        <img className="product-image" src={product.image_url || product.image || 'https://via.placeholder.com/240'} alt={product.name} />
                    </div>
                    <div className="product-info-list two-cols">
                        <div className="info-col">
                            <div className="info-row"><span className="label">Tên:</span> <span className="value">{product.name}</span></div>
                            <div className="info-row"><span className="label">Mô tả:</span> <span className="value">{product.description}</span></div>
                            <div className="info-row"><span className="label">Giá:</span> <span className="value">{product.price} VNĐ</span></div>
                            <div className="info-row"><span className="label">Thương hiệu:</span> <span className="value">{product.brand}</span></div>
                            <div className="info-row"><span className="label">Loại da:</span> <span className="value">{product.skin_type}</span></div>
                        </div>
                        <div className="info-col">
                            <div className="info-row"><span className="label">Barcode:</span> <span className="value">{product.barcode}</span></div>
                            <div className="info-row"><span className="label">Số lượng kho:</span> <span className="value">{product.stock_quantity || product.stock}</span></div>
                            <div className="info-row"><span className="label">Danh mục:</span> <span className="value">{product.category_id}</span></div>
                            <div className="info-row"><span className="label">Ngày tạo:</span> <span className="value">{product.createdAt}</span></div>
                            <div className="info-row"><span className="label">Ngày cập nhật:</span> <span className="value">{product.updatedAt}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal; 