// ProductList.jsx
import React, { useState } from 'react';
import '../../styles/ProductList.scss';
import ProductModal from '../../components/ProductModal.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/60',
      name: 'Product A',
      price: '25.00',
      stock: 120,
      status: 'Active',
      category: 'Skincare'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/60',
      name: 'Product B',
      price: '40.00',
      stock: 0,
      status: 'Inactive',
      category: 'Makeup'
    }
  ]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (data.id) {
      setProducts(prev => prev.map(p => (p.id === data.id ? data : p)));
    } else {
      const newProduct = {
        ...data,
        id: Date.now(),
        image: data.image || 'https://via.placeholder.com/60'
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || p.category === category) &&
    (status === '' || p.status === status)
  );

  return (
    <>
      <div className="product-list">
        <div className="header">
          <h2>Product Management</h2>
          <button className="btn add" onClick={handleAddClick}>+ Add Product</button>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td><span className={`status ${product.status.toLowerCase()}`}>{product.status}</span></td>
                <td>
                  <button className="btn edit" onClick={() => handleEditClick(product)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>{'<'}</button>
          <span>Page 1 of 1</span>
          <button>{'>'}</button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </>
  );
};

export default ProductList;