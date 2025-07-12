// ProductModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/ProductModal.scss';

const ProductModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    brand: '',
    skin_type: '',
    image_url: '',
    stock_quantity: '',
    category_id: '',
    barcode: '',
    status: 'Active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || initialData.product_id || null,
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        brand: initialData.brand || '',
        skin_type: initialData.skin_type || '',
        image_url: initialData.image_url || initialData.image || '',
        stock_quantity: initialData.stock_quantity || initialData.stock || '',
        category_id: initialData.category_id || '',
        barcode: initialData.barcode || '',
        status: initialData.status || 'Active',
      });
    } else {
      setFormData({
        id: null,
        name: '',
        description: '',
        price: '',
        brand: '',
        skin_type: '',
        image_url: '',
        stock_quantity: '',
        category_id: '',
        barcode: '',
        status: 'Active',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock_quantity || !formData.category_id) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }
    // Truyền đúng định dạng cho API
    const dataToSend = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      brand: formData.brand,
      skin_type: formData.skin_type,
      image_url: formData.image_url,
      stock_quantity: parseInt(formData.stock_quantity),
      category_id: parseInt(formData.category_id),
      barcode: formData.barcode,
      status: formData.status,
    };
    onSave(dataToSend);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{formData.id ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả sản phẩm"
            rows={2}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Giá (VD: 29.99)"
            required
            min="0"
            step="0.01"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Thương hiệu"
          />
          <input
            type="text"
            name="skin_type"
            value={formData.skin_type}
            onChange={handleChange}
            placeholder="Loại da phù hợp"
          />
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Đường dẫn ảnh"
          />
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            placeholder="Số lượng tồn kho"
            required
            min="0"
          />
          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            placeholder="ID danh mục"
            required
            min="0"
          />
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            placeholder="Barcode"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="actions">
            <button type="button" onClick={onClose} className="cancel">Huỷ</button>
            <button type="submit" className="save">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
