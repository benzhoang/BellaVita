import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.scss';
import Logo from '../images/Logo.jpg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                { email, password }
            );

            console.log(response.data);

            const { token, userId, userName } = response.data;
            localStorage.setItem('token', token);
            alert('Login successful!');
            if (userName == 'Admin') {
                localStorage.setItem('userEmail2', email);
                localStorage.setItem('userId2', userId);
                navigate('/admin');
            } else {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userId', userId);
                // Điều hướng sau đăng nhập
                const redirectPath = localStorage.getItem('redirectAfterLogin');
                if (redirectPath) {
                    localStorage.removeItem('redirectAfterLogin');
                    navigate(redirectPath);
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page d-flex align-items-center">
            <div className="login-blur-box d-flex justify-content-center align-items-center">
                <div className="login-form-container text-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="login-logo mb-3"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px' }}
                    />
                    <h2 className="mb-4">Đăng nhập</h2>
                    <p className="mb-4">Chào mừng bạn đến với BellaVita</p>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check text-start">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <p className="small mb-0">
                            <Link to="/forget">Quên mật khẩu?</Link>
                        </p>
                    </div>
                    <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                        Đăng nhập
                    </button>
                    <hr className="divider" />
                    <div className="or-text mb-3" style={{ color: '#888' }}>hoặc</div>
                    <button className="btn btn-outline-secondary w-100 google-btn mb-3">
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="me-2"
                            style={{ width: '20px' }}
                        />
                        Đăng nhập với Google
                    </button>
                    <div className="mt-3">
                        <p className="small">
                            Quay về trang chủ{' '}
                            <Link to="/">Trang chủ</Link>
                        </p>
                    </div>
                    <div className="mt-3">
                        <p className="small">
                            Chưa có tài khoản?{' '}
                            <Link to="/signup">Đăng ký ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;