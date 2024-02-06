/* eslint-disable react-hooks/exhaustive-deps */
import "./product.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Product from "../../container/product/product";
import Loading from "../../container/loading/loading";
import Chat from "../../container/chat/chat";
import { routes } from "../../routes/routes";


const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
            const stringData = makeString(product);
            try {
              const headers = {
                Authorization: "Bearer secret_token",
              };

              const data = await axios.post(
                `${routes.chat}/api/product`,
                { stringData },
                { headers }
              );

              console.log("data", data);
            } catch (error) {
              console.error("Error posting product:", error);
            }

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
        <div>Sorry, We can't find requested Product</div>
      ) : (
        <div className="ProductPage">
          <div className="ProductWrapper">
            {product !== null && product !== undefined ? (
              <Product product={product} />
            ) : (
              <div>Not Found</div>
            )}
          </div>
          <div className="chatWrapper">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
