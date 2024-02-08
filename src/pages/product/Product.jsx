/* eslint-disable react-hooks/exhaustive-deps */
import "./product.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Product from "../../container/product/Product";
import Loading from "../../container/loading/Loading";
import Chat from "../../container/chat/Chat";
import { routes } from "../../routes/routes";
import logo from "../../assets/shoptalk.png";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  const makeString = (jsonData) => {
    if (jsonData === undefined || jsonData === null) return "";
    let result = "\n";
    for (const key in jsonData) {
      if (
        key !== "_id" &&
        key !== "images" &&
        key !== "send_to_client" &&
        key !== "category_tree"
      ) {
        if (key === "specifications") {
          result += key.toUpperCase() + ": \n";
          for (const subKey in jsonData[key]) {
            result += `${jsonData[key][subKey]["key"]} : ${jsonData[key][subKey]["value"]},\n`;
          }
        } else {
          result += `${key.toUpperCase()} : ${jsonData[key]},\n\n`;
        }
      }
    }
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === "/product") {
        const productParams = new URLSearchParams(location.search);
        const productIdFromLocation = productParams.get("id");
        if (productIdFromLocation) {
          try {
            const response = await axios.get(
              `${routes.auth}/product/getProduct?productID=${productIdFromLocation}`
              );
              
              const product = response.data.product;
              console.log("product", product);
              const stringData = makeString(product);
              localStorage.setItem("product", stringData);

            setProduct(product);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
            setError(error);
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ProductPageWrapper">
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Sorry, We can&apos;t find requested Product</div>
      ) : (
        <div className="ProductPage">
          <Product product={product} />
          <div className="chatWrapper desktop-chat">
            <Chat />
          </div>
          <div
            className="chatWrapper mobile-chat"
            style={{
              display: `${showChat ? "flex" : "none"}`,
            }}
          >
            <Chat />
          </div>
          <div className="chat-btn" onClick={() => setShowChat(!showChat)}>
            <img src={logo} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
