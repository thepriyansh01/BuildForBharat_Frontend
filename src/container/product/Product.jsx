import ProductCarousel from "../productCarousel/productCarousel";
import "./product.css";
const Product = ({ product }) => {
  const {
    name,
    brand,
    price,
    discounted_price,
    description,
    images,
    specifications,
  } = product;

  return (
    <div className="Product">
      <ProductCarousel images={images} />
      <div className="product-page-details">
        <div className="productCardRow">
          <div className="productCardNameCol">
            <h2 className="productCardName">{name} </h2>
            {brand && <div className="productCardBrand">{brand}</div>}
          </div>
          <div className="productCardPriceCol">
            {discounted_price && discounted_price !== price && (
              <div className="productCardDiscountedPrice">
                ₹{discounted_price}
              </div>
            )}
            {!(discounted_price && discounted_price !== price) && (
              <div className="productCardDiscountedPrice">₹{price}</div>
            )}
            {discounted_price && discounted_price !== price && (
              <s className="productCardPrice">₹{price}</s>
            )}
          </div>
        </div>
        <div className="productCardDescription">{description}</div>
        <div className="product-list-label">Specifications</div>
        <div className="specifications">
          {specifications.map((specification, i) => (
            <div key={i} className="specificationRow">
              <div className="specificationElement key">
                {specification.key && specification.key}
              </div>
              <div className="specificationElement value">
                {specification.value && specification.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
