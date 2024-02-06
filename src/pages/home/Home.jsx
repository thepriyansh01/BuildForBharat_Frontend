import Products from "./homeJsonData";
import "./home.css";
import ProductCard from "../../container/card/productCard";

const Home = () => {
  return (
    <div className="dashboard">
      <div className="product-List-wrapper">
        <div className="product-list">
          {Products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
