// ProductList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ProductList.scss';
import ProductModal from '../../components/ProductModal.jsx';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ProductDetailModal from '../../components/ProductDetailModal.jsx';

// Đọc URL API từ .env
const API_URL = import.meta.env.VITE_API_URL;

// Thêm hàm formatPrice để định dạng số tiền
const formatPrice = (price) => {
  if (!price) return '0';
  // Chuyển về số, loại bỏ .00, thêm dấu phẩy
  const num = Number(price);
  return num.toLocaleString('vi-VN');
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  // ✅ Fetch product list from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setRawProducts(res.data); // Lưu dữ liệu gốc
      // Map lại dữ liệu cho đúng với bảng
      const mapped = res.data.map(p => ({
        id: p.product_id || p.id, // fallback nếu API trả về id
        name: p.name,
        price: p.price,
        stock: p.stock_quantity || p.stock,
        status: p.status || "Active", // nếu chưa có status thì mặc định
        image: p.image_url || p.image || 'https://via.placeholder.com/60',
      }));
      setProducts(mapped);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleViewClick = (product) => {
    // Lấy object gốc từ rawProducts theo id
    const raw = rawProducts.find(p => (p.product_id || p.id) === product.id);
    setDetailProduct(raw || product);
    setIsDetailOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        // PUT to update
        await axios.put(`${API_URL}/api/products/${data.id}`, data);
      } else {
        // POST to create
        await axios.post(`${API_URL}/api/products`, {
          ...data,
          image: data.image || 'https://via.placeholder.com/60',
        });
      }
      setIsModalOpen(false);
      fetchProducts(); // reload
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts(); // reload
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || p.category === category) &&
    (status === '' || p.status === status)
  );

  // Phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log('isModalOpen:', isModalOpen);

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
              <th>STT</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, idx) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td><img src={product.image} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)} VNĐ</td>
                <td>{product.stock}</td>
                <td><span className={`status ${product.status.toLowerCase()}`}>{product.status}</span></td>
                <td>
                  <button title="Xem chi tiết" className="icon-btn view" onClick={() => handleViewClick(product)}>
                    <FaEye />
                  </button>
                  <button title="Sửa" className="icon-btn edit" onClick={() => handleEditClick(product)}>
                    <FaEdit />
                  </button>
                  <button title="Xoá" className="icon-btn delete" onClick={() => handleDelete(product.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{'<'}</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>{'>'}</button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProduct}
      />

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={detailProduct}
      />
    </>
  );
};

export default ProductList;
