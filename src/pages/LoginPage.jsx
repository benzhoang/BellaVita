import React from 'react';
import '../styles/LoginPage.scss';
import Logo from '../images/Logo.jpg'

const LoginPage = () => {
    return (
        <div className="login-page d-flex align-items-center">
            <div className="login-blur-box d-flex justify-content-center align-items-center">
                <div className="login-form-container text-center">
                    <h2 className="mb-4">Log in</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control mb-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control mb-3"
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

                    <button className="btn btn-primary w-100 mb-3">
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