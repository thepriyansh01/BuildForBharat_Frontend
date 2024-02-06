/* eslint-disable react/prop-types */
import { useState } from "react";
import "./cardCarousel.css";
import { useNavigate } from "react-router-dom";

const CardCarousel = ({ images, productId }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const handleNavigate = () => {
    navigate(`/product?id=${encodeURIComponent(productId)}`);
  };

  return (
    <div className="carousel">
      {images && images.length > 1 && (
        <div className="carouselButton" onClick={prevImage}>
          &lt;
        </div>
      )}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`carousel-img-${i}`}
          onClick={() => handleNavigate()}
          className={i === index ? "active" : ""}
          onError={(e) => {
            e.target.src =
              "https://www.keh.com/media/catalog/product/placeholder/default/placeholder-min_4.png";
          }}
        />
      ))}

      {images && images.length > 1 && (
        <div className="carousel-dots-line">
          {images.map((img, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></div>
          ))}
        </div>
      )}
      {images && images.length > 1 && (
        <div className="carouselButton" onClick={nextImage}>
          &gt;
        </div>
      )}
    </div>
  );
};
export default CardCarousel;
