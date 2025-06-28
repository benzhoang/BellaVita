// src/admin/pages/UserList.jsx
import React, { useState } from 'react';
import '../styles/UserList.scss';

const mockUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b@example.com',
    role: 'User',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'c@example.com',
    role: 'User',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
];

export default function UserList() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filter === 'All' || user.role === filter) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="user-list">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="mb-0">Quản lý người dùng</h4>
        <div className="d-flex flex-wrap gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm người dùng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">Tất cả vai trò</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th className="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="rounded-circle avatar-sm"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge bg-${user.role === 'Admin' ? 'primary' : 'secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge rounded-pill bg-${
                      user.status === 'Active' ? 'success' : 'danger'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <i className="bi bi-pencil" /> Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="bi bi-trash" /> Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled">
              <span className="page-link">«</span>
            </li>
            <li className="page-item active">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <span className="page-link">2</span>
            </li>
            <li className="page-item">
              <span className="page-link">3</span>
            </li>
            <li className="page-item">
              <span className="page-link">»</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
