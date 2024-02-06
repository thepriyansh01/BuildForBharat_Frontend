import { useState, useEffect, useContext } from "react";
import "./preLoader.css";
import { css } from "@emotion/react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { routes } from "../../routes/routes";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";

const Preloader = ({ onFinish }) => {
  const [loading, setLoading] = useState(true);
  const { token, dispatch } = useContext(AuthContext);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const authenticateToken = async () => {
    if (!token) {
      onFinish();
      return;
    }
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post(`${routes.auth}/auth/verifyToken`, {
        token: token,
      });
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: token });
        setLoading(false);
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  useEffect(() => {
    authenticateToken();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        onFinish();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, onFinish]);

  return (
    <div className="preloader-container">
      <ClimbingBoxLoader
        color={"#fff"}
        loading={true}
        css={override}
        size={25}
      />
      <h1 className="preloader-heading">Your AI assited Shopping Platform</h1>
    </div>
  );
};

export default Preloader;
