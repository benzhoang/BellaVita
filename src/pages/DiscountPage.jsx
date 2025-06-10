import '../styles/DiscountPage.scss';
import Card1 from '../images/card1.jpg';
import Banner4 from '../images/banner4.jpg';

const DiscountPage = () => {
    const productCarousel = (
        <div className="carousel-wrapper mb-5">
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Banner4} className="image d-block w-100" alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={Banner4} className="image d-block w-100" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={Banner4} className="image d-block w-100" alt="Slide 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );

    const productGrid = (
    <div className="card-grid container">
        <div className="card-item">
            <img src={Card1} alt="Card 1" className="card-img" />
            <a href="#" className="card-title">10.6 Siêu Sale Giờ Vàng - Giá Giảm Một Nửa</a>
        </div>
        <div className="card-item">
            <img src={Card1} alt="Card 2" className="card-img" />
            <a href="#" className="card-title">Khai trương chi nhánh 261 - Đồng Xoài, Bình Phước</a>
        </div>
        <div className="card-item">
            <img src={Card1} alt="Card 3" className="card-img" />
            <a href="#" className="card-title">[HOT] Ưu đãi trải nghiệm làm đẹp đến hơn 60%</a>
        </div>
        <div className="card-item">
            <img src={Card1} alt="Card 4" className="card-img" />
            <a href="#" className="card-title">Unilever Nâng Niu Nét Đẹp Toàn Diện</a>
        </div>
        <div className="card-item">
            <img src={Card1} alt="Card 4" className="card-img" />
            <a href="#" className="card-title">Unilever Nâng Niu Nét Đẹp Toàn Diện</a>
        </div>
        <div className="card-item">
            <img src={Card1} alt="Card 4" className="card-img" />
            <a href="#" className="card-title">Unilever Nâng Niu Nét Đẹp Toàn Diện</a>
        </div>
    </div>
);


    return (
        <div className="discount-page container-fluid py-4">
            {productCarousel}
            {productGrid}
        </div>
    );
};

export default DiscountPage;
