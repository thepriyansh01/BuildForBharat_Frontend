import "./productCarousel.css";
import { useState } from "react";

const ProductCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <div className="productCarousel">
      <div className="productCarouselButton" onClick={prevImage}>
        &lt;
      </div>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`carousel-img-${i}`}
          className={i === index ? "active" : ""}
          onError={(e) => {
            e.target.src =
              "https://www.keh.com/media/catalog/product/placeholder/default/placeholder-min_4.png";
          }}
        />
      ))}
      <div className="dots-line">
        {images.map((img, i) => (
          <div
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
      <div className="productCarouselButton" onClick={nextImage}>
        &gt;
      </div>
    </div>
  );
};

export default ProductCarousel;
