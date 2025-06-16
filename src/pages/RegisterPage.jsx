import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.scss';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                name,
                email,
                password,
                social_provider: 'local',
            });
            alert('Registration successful! Please login.');

            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="register-page d-flex">
            <div className="register-blur-box d-flex justify-content-center align-items-center">
                <div className="register-form-container text-start">
                    <h2 className="mb-4 fw-bold text-center">Register</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control mb-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control mb-3"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />


                    <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                        Register
                    </button>

                    <hr />

                    <button className="btn btn-outline-secondary w-100 google-btn mb-3">
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="Google"
                            className="me-2"
                            style={{ width: '20px' }}
                        />
                        Log in with Google
                    </button>

                    <div className="mt-3 d-flex flex-column align-items-center text-center w-100">
                        <p className="small mb-1">
                            You already have an account? <a href="/login">Login</a>
                        </p>
                        <p className="small">
                            You forgot password? <a href="/forget">Forget password</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;