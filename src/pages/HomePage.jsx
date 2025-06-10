import { Link } from 'react-router-dom';
import '../styles/HomePage.scss';
import Image from '../images/Images.webp';
import ProductImage from '../images/banner-main.png'; 
import Banner1 from '../images/banner1.jpg';
import Banner2 from '../images/banner2.webp';
import Banner3 from '../images/banner3.png';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HomePage = () => {
    const cardData = (titles) =>
        titles.map((title, index) => ({
            id: index,
            image: Image,
            discount: "-40%",
            title,
            oldPrice: "1.000.000 đ",
            newPrice: "598.000 đ",
            buyText: "MUA NGAY",
            cartText: "Thêm vào giỏ hàng"
        }));
        

const renderCards = (data, basePath) => {
  const itemsPerSlide = 4;
  const numSlides = Math.ceil(data.length / itemsPerSlide);
  const slides = Array.from({ length: numSlides }, (_, i) =>
    data.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
  );

  return (
    <div id={`carousel-${basePath}`} className="carousel slide custom-carousel" data-bs-ride="carousel">
      <div className="carousel-inner px-0">
        {slides.map((slide, slideIndex) => (
          <div className={`carousel-item ${slideIndex === 0 ? "active" : ""}`} key={slideIndex}>
            <div className="d-flex gap-3 justify-content-center px-3">
              {slide.map((item) => (
                <Link to={`/${basePath}/${item.id}`} className="custom-card-link" key={item.id}>
                  <div className="custom-card">
                    <div className="discount-tag">{item.discount}</div>
                    <img src={item.image} alt="card-img" className="card-image" />
                    <div className="card-body">
                      <p className="card-title">{item.title}</p>
                      <div className="price-wrapper">
                        <span className="old-price">{item.oldPrice}</span>
                        <span className="current-price">{item.newPrice}</span>
                      </div>
                      <div className="card-buttons">
                        <button className="add-to-cart-btn">{item.cartText}</button>
                        <button className="buy-button">{item.buyText}</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target={`#carousel-${basePath}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target={`#carousel-${basePath}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};





    const productCarousel = (
        <div className="carousel-wrapper mb-5">
            <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Banner1} className="image d-block w-100" alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={Banner2} className="image d-block w-100" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={Banner3} className="image d-block w-100" alt="Slide 3" />
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

   const mainBanner = (
  <div className="main-banner">
    <div className="banner-content">
     
      <div className="text-section">
        <div className="label">Giao hàng miễn phí trên toàn quốc</div>
        <h2 className="title">
          Kem che<br />
          khuyết điểm<br />
          & kiềm dầu
        </h2>
        <p className="desc">
          Kem nền Maybelline #1 hoàn hảo cho da dầu, không bết dính, không bóng nhờn
        </p>
        <button className="btn-buy">Thêm vào giỏ hàng</button>
      </div>

      
      <div className="product-image">
        <img src={ProductImage} alt="Sản phẩm" />
      </div>

      
      <div className="product-detail-box">
        <p className="price-label">Chi tiết</p>
        <p className="price">288.000 <span className="currency">đ</span></p>
        <p className="size">30 ml</p>
        <div className="stars">★ ★ ★ ★ ☆</div>
        <div className="product-nav">
          <button className="product-btn"><FaAngleLeft/></button>
          <button className="product-btn"><FaAngleRight/></button>
        </div>
      </div>
    </div>
  </div>
);




    return (
        <div className="homepage container-fluid py-5">
            {mainBanner}

            <div className="section mb-5">
                <h2 className="section-header">Sản phẩm bán chạy</h2>
                {renderCards(cardData([
                    "ZEE Dưỡng trắng da 100ml",
                    "ZEE Dưỡng trắng da 120ml",
                    "ZEE Dưỡng trắng da 150ml",
                    "ZEE Dưỡng trắng da 200ml",
                    "ZEE Dưỡng trắng da 250ml",
                    "ZEE Dưỡng trắng da 300ml",
                ]), "products")}
            </div>

            {productCarousel}

            <div className="section mb-5">
                <h2 className="section-header">Xu hướng làm đẹp</h2>
                {renderCards(cardData([
                    "ZEE Dưỡng trắng da 100ml",
                    "ZEE Dưỡng trắng da 120ml",
                    "ZEE Dưỡng trắng da 150ml",
                    "ZEE Dưỡng trắng da 200ml",
                    "ZEE Dưỡng trắng da 250ml",
                    "ZEE Dưỡng trắng da 300ml"
                ]), "trending")}
            </div>

            <div className="section mb-5">
                <h2 className="section-header">Sản phẩm mới</h2>
                {renderCards(cardData([
                    "ZEE Dưỡng trắng da 100ml",
                    "ZEE Dưỡng trắng da 120ml",
                    "ZEE Dưỡng trắng da 150ml",
                    "ZEE Dưỡng trắng da 200ml",
                    "ZEE Dưỡng trắng da 250ml",
                    "ZEE Dưỡng trắng da 300ml"
                ]), "new")}
            </div>
        </div>
    );
};

export default HomePage;
