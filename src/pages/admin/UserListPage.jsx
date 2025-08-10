import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserList.scss";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 5; // số user mỗi trang
  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = "Bearer <TOKEN_CỦA_BẠN>"; // lấy từ Swagger

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json'
          }
        });

      // Giả sử API trả toàn bộ users, ta sẽ tự phân trang ở FE
      const allUsers = res.data || [];
      const filtered = allUsers.filter(
        (u) =>
          (filter === "All" || u.role?.toLowerCase() === filter.toLowerCase()) &&
          (u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase()))
      );

      setTotalPages(Math.ceil(filtered.length / pageSize));
      const start = (page - 1) * pageSize;
      setUsers(filtered.slice(start, start + pageSize));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, filter, page]);

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers(users.filter((user) => user.user_id !== id));
    }
  };

  return (
    <div className="user-list shadow-lg p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="mb-0 text-primary fw-bold">Quản lý người dùng</h4>
        <div className="d-flex flex-wrap gap-2">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <select
            className="form-select shadow-sm"
            value={filter}
            onChange={(e) => {
              setPage(1);
              setFilter(e.target.value);
            }}
          >
            <option value="All">Tất cả vai trò</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="table-responsive rounded shadow-sm">
        <table className="table table-hover align-middle bg-white">
          <thead className="table-primary">
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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{(page - 1) * pageSize + index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/100?u=${user.email}`}
                        alt="avatar"
                        className="rounded-circle avatar-sm border"
                      />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        user.role === "admin"
                          ? "primary"
                          : user.role === "manager"
                          ? "warning"
                          : "secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill bg-${
                        user.status ? "success" : "danger"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil" /> Sửa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <i className="bi bi-trash" /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-3">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-end mt-4">
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <span
                className="page-link"
                onClick={() => page > 1 && setPage(page - 1)}
              >
                «
              </span>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <span className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </span>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <span
                className="page-link"
                onClick={() => page < totalPages && setPage(page + 1)}
              >
                »
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
