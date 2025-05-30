import React from "react";
import "../styles/UpgradePage.scss";

const UpgradePage = () => {
    return (
        <div className="pricing-container container py-5">
            <div className="row justify-content-center align-items-stretch">
                {/* Free Plan */}
                <div className="col-md-4 mb-4 d-flex">
                    <div className="card pricing-card free h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">Miễn phí</h3>
                            <h2 className="price">$0 <small>USD/tháng</small></h2>
                            <p className="description">Cùng khám phá sự hỗ trợ của AI trong các công việc hằng ngày của bạn</p>
                            <ul className="features flex-grow-1">
                                <li>Truy cập GPT-4o mini và tính năng suy luận</li>
                                <li>Chế độ thoại tiêu chuẩn</li>
                                <li>Dữ liệu thời gian thực từ web qua tính năng tìm kiếm</li>
                                <li>Truy cập giới hạn vào GPT-4o và o4-mini</li>
                                <li>Hạn chế quyền truy cập vào các tính năng tải tệp lên, phân tích dữ liệu nâng cao và tạo ảnh</li>
                                <li>Sử dụng GPT tùy chỉnh</li>
                            </ul>
                            <button className="btn btn-secondary w-100 mt-auto" disabled>Gói hiện tại của bạn</button>
                        </div>
                    </div>
                </div>

                {/* Plus Plan */}
                <div className="col-md-4 mb-4 d-flex">
                    <div className="card pricing-card plus h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title d-flex justify-content-between align-items-center">
                                Plus <span className="badge bg-success text-white">Phổ biến</span>
                            </h3>
                            <h2 className="price">$20 <small>USD/tháng</small></h2>
                            <p className="description">Nâng cao năng suất và tính sáng tạo với quyền truy cập mở rộng</p>
                            <ul className="features flex-grow-1">
                                <li>Mọi tính năng trong gói Free</li>
                                <li>Mở rộng quyền truy cập vào các tính năng nhắn tin, tải tệp lên, phân tích dữ liệu nâng cao và tạo ảnh</li>
                                <li>Chế độ thoại tiêu chuẩn và nâng cao</li>
                                <li>Quyền truy cập vào chức năng nghiên cứu chuyên sâu, nhiều mô hình suy luận (o4-mini, o4, o3...)</li>
                                <li>Tạo và sử dụng các nhiệm vụ, dự án cũng như GPT tùy chỉnh</li>
                                <li>Quyền truy cập hạn chế vào chức năng tạo video Sora</li>
                                <li>Cơ hội để thử nghiệm các tính năng mới</li>
                            </ul>
                            <button className="btn btn-success w-100 mt-auto">Chuyển sang Plus</button>
                        </div>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="col-md-4 mb-4 d-flex">
                    <div className="card pricing-card pro h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">Pro</h3>
                            <h2 className="price">$200 <small>USD/tháng</small></h2>
                            <p className="description">Khai thác tối đa OpenAI với cấp độ truy cập cao nhất</p>
                            <ul className="features flex-grow-1">
                                <li>Mọi tính năng trong gói Plus</li>
                                <li>Truy cập không giới hạn vào tất cả các mô hình suy luận và GPT-4o</li>
                                <li>Quyền truy cập không giới hạn vào chế độ thoại nâng cao</li>
                                <li>Mở rộng quyền truy cập vào chức năng nghiên cứu chuyên sâu</li>
                                <li>Truy cập vào các bản xem trước nghiên cứu của GPT-4.5 và Operator</li>
                                <li>Truy cập chế độ o1 pro, tăng khả năng trả lời tối ưu</li>
                                <li>Quyền truy cập mở rộng vào video Sora</li>
                                <li>Xem trước nghiên cứu của tác nhân Codex</li>
                            </ul>
                            <button className="btn btn-dark w-100 mt-auto">Chuyển sang Pro</button>
                            <small className="text-muted d-block mt-3">
                                Không giới hạn tùy thuộc vào các quy định bảo vệ tránh lạm dụng
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradePage;