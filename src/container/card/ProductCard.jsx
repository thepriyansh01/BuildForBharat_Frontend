import "./productCard.css";
import { useNavigate } from "react-router-dom";
import CardCarousel from "./cardCarousel/cardCarousel";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, brand, price, discounted_price, description, images } = product;
  const handleNavigate = (id) => {
    navigate(`/product?id=${encodeURIComponent(id)}`);
  };
  return (
    <div className="product-card">
      <div className="carouselWrapper">
        <CardCarousel images={images} productId={product?._id} />
      </div>
      <div
        className="product-details"
        onClick={() => handleNavigate(product?._id)}
      >
        <div className="cardRow">
          <div className="cardNameCol">
            <h2 className="cardName">{name} </h2>
            {brand && <div className="cardBrand">{brand}</div>}
          </div>
          <div className="cardPriceCol">
            {discounted_price && discounted_price !== price && (
              <div className="cardDiscountedPrice">₹{discounted_price}</div>
            )}
            {!(discounted_price && discounted_price !== price) && (
              <div className="cardDiscountedPrice">₹{price}</div>
            )}
            {discounted_price && discounted_price !== price && (
              <s className="cardPrice">₹{price}</s>
            )}
          </div>
        </div>
        <div className="cardDescription">
          {description.slice(0, 100)}
          {description.length > 100 ? "..." : ""}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
