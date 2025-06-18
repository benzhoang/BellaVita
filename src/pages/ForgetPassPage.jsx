import React from 'react';
import '../styles/ForgetPassPage.scss';

const ForgetPassPage = () => {
    return (
        <div className="fp-page d-flex">
            <div className="fp-blur-box d-flex justify-content-center align-items-center">
                <div className="fp-form-container text-start">
                    <h2 className="mb-4 text-center">Quên mật khẩu</h2>

                    <p className="text-center mb-4 small">
                        Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
                    </p>

                    <input
                        type="email"
                        placeholder="Email của bạn"
                        className="form-control mb-3"
                    />

                    <button className="btn btn-primary w-100 mb-3">
                        Gửi liên kết
                    </button>

                    <hr />

                    <div className="mt-3 d-flex flex-column align-items-center text-center w-100">
                        <p className="small mb-1">
                            Nhớ mật khẩu của bạn? <a href="/login">Đăng nhập</a>
                        </p>
                        <p className="small">
                            Chưa có tài khoản? <a href="/signup">Đăng ký</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassPage;