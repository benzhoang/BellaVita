import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email); // Store email in localStorage
            alert('Login successful!');

            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page d-flex align-items-center">
            <div className="login-blur-box d-flex justify-content-center align-items-center">
                <div className="login-form-container text-center">
                    <h2 className="mb-4">Log in</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
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
                                Remember me
                            </label>
                        </div>
                        <p className="small mb-0">
                            <a href="/forget">Forget password</a>
                        </p>
                    </div>

                    <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                        Log in
                    </button>

                    <hr className="divider" />

                    <button className="btn btn-outline-secondary w-100 google-btn mb-3">
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="me-2"
                            style={{ width: '20px' }}
                        />
                        Log in with Google
                    </button>

                    <div className="mt-3">
                        <p className="small">
                            You don't have an account?{' '}
                            <a href="/signup">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;