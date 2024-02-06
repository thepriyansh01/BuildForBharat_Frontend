/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import ProductCard from "../../container/card/productCard";
import Loading from "../../container/loading/loading";
import { routes } from "../../routes/routes";

const SearchPage = () => {
  const { searchString } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNavigate = () => {};
  const getProducts = async () => {
    if (!searchString || error) {
      // console.log(`return due to ${searchString} or ${error}`);
      return;
    }
    try {
      const response = await axios.get(
        `${routes.auth}/product/searchProducts?searchString=${searchString}&page=${page}&pageSize=${pageSize}`
      );
      // console.log(`data for ${searchString}`, response.data.products);
      setProducts((prevProducts) => {
        const newProducts = response.data.products.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct._id === newProduct._id
            )
        );
        if (response.data.products.length === 0) setError(true);
        return [...prevProducts, ...newProducts];
      });
      setError(null);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("searchString changed", searchString);
    if (searchString !== null) setProducts([]);
    setPage(1);
    setError(null);
    getProducts();
  }, [searchString]);

  useEffect(() => {
    getProducts();
    // console.log("product length : ", products.length);
  }, [page]);

  const handelInfiniteScroll = async () => {
    if (error) {
      console.log(error);
      return;
    }
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        // console.log("page added");
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div className="dashboard">
      {error && !products ? (
        <div>Error loading data : {error.message}</div>
      ) : (
        <div className="product-List-wrapper">
          {searchString && (
            <div className="product-list-label">
              {`
              Searched for : "${searchString.slice(0, 50)}${
                searchString.length > 50 ? "..." : ""
              }"`}
            </div>
          )}
          <div className="product-list">
            {products.map((product, index) => (
              <div onClick={() => handleNavigate(product)} key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {products.length === 0 && <div>No Results Found</div>}
          {loading && !error && <Loading />}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
