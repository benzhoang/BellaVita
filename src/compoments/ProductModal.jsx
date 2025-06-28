// ProductModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/ProductModal.scss';

const ProductModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    stock: '',
    status: 'Active',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: null,
        name: '',
        price: '',
        stock: '',
        status: 'Active',
        category: '',
        image: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert('Please fill in all required fields.');
      return;
    }
    onSave(formData);
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
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (e.g. 29.99)"    
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
          </select>
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
            <button type="button" onClick={onClose} className="cancel">Cancel</button>
            <button type="submit" className="save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
