import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";

import Header from "./container/navbars/header.jsx";
import Home from "./pages/home/home.jsx";
import Auth from "./pages/auth/auth.jsx";
import Footer from "./container/navbars/footer.jsx";
import SearchPage from "./pages/search/search.jsx";
import ProductPage from "./pages/product/product.jsx";
import Preloader from "./utils/preLoader/preLoader.jsx";
import NotFound from "./pages/default/notFound.jsx";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isPreLoading, setIsPreloading] = useState(true);

  const handlePreloadingFinish = () => {
    setIsPreloading(false);
  };

  return (
    <BrowserRouter>
      {!isPreLoading && <Header />}
      <Routes>
        <Route path="/" element={isPreLoading ? <Preloader onFinish={handlePreloadingFinish} /> : (isAuthenticated ? <Home /> : <Navigate to="/auth" replace />)} />
        <Route path="/search" element={isPreLoading ? <Preloader onFinish={handlePreloadingFinish} /> : (isAuthenticated ? <SearchPage /> : <Navigate to="/auth" replace />)} />
        <Route path="/product" element={isPreLoading ? <Preloader onFinish={handlePreloadingFinish} /> : (isAuthenticated ? <ProductPage /> : <Navigate to="/auth" replace />)} />
        <Route path="*" element={isPreLoading ? <Preloader onFinish={handlePreloadingFinish} /> : (isAuthenticated ? <NotFound /> : <Navigate to="/auth" replace />)} />
        <Route path="/auth" element={isPreLoading ? <Preloader onFinish={handlePreloadingFinish} /> : <Auth />} />
      </Routes>
      {!isPreLoading && <Footer />}
    </BrowserRouter>
  )
};

export default App;
