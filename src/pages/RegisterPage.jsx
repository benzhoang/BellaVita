import React, { useState } from "react";
import axios from "axios";
import "../styles/RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo.jpg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
        social_provider: "local",
      });
      alert("Registration successful! Please login.");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register d-flex align-items-center">
    <div className="register-box d-flex justify-content-center align-items-center">
        <div className="register-container text-center">
          <img
            src={Logo}
            alt="Logo"
            className="login-logo mb-3"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "16px",
            }}
          />
          <h2 className="mb-4">Đăng ký</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email của bạn"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-100 mb-3"
            onClick={handleRegister}
          >
            Đăng ký
          </button>

          <hr />

          <button className="btn btn-outline-secondary w-100 google-btn mb-3">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="me-2"
              style={{ width: "20px" }}
            />
            Đăng ký với Google
          </button>

          <div className="mt-3 d-flex flex-column align-items-center text-center w-100">
            <p className="small mb-1">
              Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
            </p>
            <p className="small">
              Bạn đã quên mật khẩu? <a href="/forget">Quên mật khẩu</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
