import "../styles/UpgradePage.scss";

const UpgradePage = () => {
    return (
        <div className="pricing-container container-fluid py-5">
            <div className="row justify-content-center align-items-stretch">
                {/* Free Plan */}
                <div className="col-md-4 mb-4 d-flex">
                    <div className="card pricing-card free h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">Basic Plan</h3>
                            <h2 className="price">0 <small>VNĐ/tháng</small></h2>
                            <p className="description">Dành cho người dùng mới muốn trải nghiệm nền tảng BellaVita.</p>
                            <ul className="features flex-grow-1">
                                <li>Truy cập kho sản phẩm đa dạng từ nhiều thương hiệu.</li>
                                <li>Nhận tư vấn cơ bản từ AI (dựa trên loại da & mục tiêu chăm sóc).</li>
                                <li>Xem đánh giá & nhận xét từ cộng đồng người dùng.</li>
                                <li>Tạo danh sách yêu thích & lưu sản phẩm.</li>
                                <li>Hỗ trợ khách hàng qua chatbot 24/7.</li>
                                <li>Nhận thông báo khuyến mãi & sản phẩm mới phù hợp.</li>
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
                                Premium Plan <span className="badge bg-secondary text-white">Phổ biến</span>
                            </h3>
                            <h2 className="price">250.000 <small>VNĐ/tháng</small></h2>
                            <p className="description">Dành cho người dùng thường xuyên cần tư vấn chuyên sâu & ưu đãi độc quyền.</p>
                            <ul className="features flex-grow-1">
                                <li>Tất cả các tiện ích từ Basic Plan.</li>
                                <li>AI tư vấn nâng cao theo thời gian thực (phân tích thói quen, khí hậu, độ tuổi...).</li>
                                <li>Ưu đãi độc quyền từ đối tác (giảm giá, quà tặng).</li>
                                <li>Gợi ý bộ sản phẩm trọn gói cá nhân hóa (skincare routine, makeup...).</li>
                                <li>Ưu tiên hỗ trợ từ chuyên viên tư vấn thật.</li>
                                <li>Ưu tiên xử lý đơn hàng và giao hàng nhanh.</li>
                                <li>Tự động cập nhật routine chăm sóc theo mùa, thời tiết và xu hướng.</li>
                            </ul>
                            <button className="btn btn-warning w-100 mt-auto">Chuyển sang Plus</button>
                        </div>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="col-md-4 mb-4 d-flex">
                    <div className="card pricing-card pro h-100 w-100">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">Annual Plan</h3>
                            <h2 className="price">1.200.000 <small>VNĐ/năm</small></h2>
                            <p className="description">Gói tiết kiệm nhất với đầy đủ tiện ích cao cấp và
                                quyền lợi dành riêng cho thành viên VIP.</p>
                            <ul className="features flex-grow-1">
                                <li>Tất cả các tiện ích từ Premium Plan.</li>
                                <li>Tư vấn trực tiếp với chuyên gia mỗi quý (qua video call).</li>
                                <li>Truy cập sớm các sản phẩm và tính năng mới.</li>
                                <li>Quà tặng sinh nhật và ưu đãi cá nhân hóa theo từng dịp lễ.</li>
                                <li>Ưu tiên tham gia các sự kiện độc quyền (workshop, livestream, flash sale VIP).</li>
                                <li>Tùy chỉnh giao diện trải nghiệm AI theo phong cách cá nhân.</li>
                                <li>Theo dõi tiến trình cải thiện làn da qua AI định kỳ (Skin Progress Tracker).</li>
                                <li>Huy hiệu thành viên VIP & quyền truy cập nhóm cộng đồng riêng tư.</li>
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