import React from 'react';
import '../styles/AboutUsPage.scss';

import shoppingImg from '../images/shopping.jpg';
import AIImg from '../images/AI.jpg';
import trustImg from '../images/Trust.webp';

const AboutUsPage = () => {
    return (
        <div className="about-us-section py-5">
            <h2 className="section-heading text-center mb-5">
                Mang Đến Vẻ Đẹp Hoàn Hảo Từ Những Thương Hiệu Hàng Đầu
            </h2>

            {/* Feature 1 */}
            <div className="row align-items-center mb-5 feature-item">
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="image-wrapper">
                        <img src={shoppingImg} alt="Shopping" className="img-fluid rounded shadow" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="feature-title">Trải Nghiệm Mua Sắm Đẳng Cấp</h4>
                    <p className="feature-text">
                        Tại BellaVita, bạn sẽ tìm thấy sự đa dạng về sản phẩm làm đẹp, từ chăm sóc da,
                        trang điểm đến dưỡng tóc và cơ thể. Chúng tôi không chỉ cung cấp sản phẩm mà còn
                        mang đến trải nghiệm mua sắm tiện lợi, nhanh chóng và đáng tin cậy.
                    </p>
                    <button className="btn-learn-more">Tìm hiểu thêm</button>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="row align-items-center flex-md-row-reverse mb-5 feature-item">
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="image-wrapper">
                        <img src={AIImg} alt="AI" className="img-fluid rounded shadow" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="feature-title">AI tư vấn sản phẩm</h4>
                    <p className="feature-text">
                        Hệ thống AI của BellaVita luôn sẵn sàng lắng nghe và
                        phân tích nhu cầu của bạn để đề xuất những sản phẩm làm đẹp phù hợp nhất.
                        Chúng tôi hiểu rằng mỗi người có làn da và phong cách riêng biệt,
                        và AI của chúng tôi được thiết kế để mang đến cho bạn những gợi ý cá nhân hóa tối ưu nhất.
                    </p>
                    <button className="btn-learn-more">Tìm hiểu thêm</button>
                </div>
            </div>

            {/* Feature 3 */}
            <div className="row align-items-center mb-5 feature-item">
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="image-wrapper">
                        <img src={trustImg} alt="Trust" className="img-fluid rounded shadow" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="feature-title">Niềm Tin Vào Sản Phẩm Chính Hãng</h4>
                    <p className="feature-text">
                        Chúng tôi cam kết chỉ mang đến những sản phẩm chính hãng từ các thương hiệu mỹ phẩm nổi tiếng.
                        Mỗi sản phẩm được tuyển chọn kỹ lưỡng để đảm bảo chất lượng, an toàn và hiệu quả cho người sử dụng.
                    </p>
                    <button className="btn-learn-more">Tìm hiểu thêm</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
