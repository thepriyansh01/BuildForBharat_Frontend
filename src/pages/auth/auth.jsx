import { useContext, useEffect, useState } from "react";
import "./auth.css";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { routes } from "../../routes/routes";

const TailwindToaster = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message)}</p>
        </Transition>
      )}
    </Toaster>
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("trying to login...");
    dispatch({ type: "LOGIN_START" });
    console.log("login started...");
    try {
      const res = await axios.post(`${routes.auth}/auth/login`, loginCredentials);
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${routes.auth}/auth/register`,
        registerCredentials
      );
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      // console.log(error);
    }
  };

  return (
    <form className="AuthContainer">
      <div className="Auth">
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={
            isLogin ? loginCredentials.username : registerCredentials.username
          }
          onChange={isLogin ? handleLoginChange : handleSignUpChange}
        />
        {!isLogin ? (
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            autoComplete="username"
            value={registerCredentials.email}
            onChange={handleSignUpChange}
          />
        ) : (
          <></>
        )}
        <input
          type={isPasswordHidden ? "password" : "text"}
          name="password"
          placeholder="Enter Password"
          autoComplete="current-password"
          value={
            isLogin ? loginCredentials.password : registerCredentials.password
          }
          onChange={isLogin ? handleLoginChange : handleSignUpChange}
        />
        <div className="showPassword">
          <input
            className="showPasswordInput"
            id="showPasswordCheckbox"
            type="checkbox"
            value={isPasswordHidden}
            onClick={() => {
              setIsPasswordHidden(!isPasswordHidden);
            }}
          />
          <label htmlFor="showPasswordCheckbox">Show Password</label>
        </div>
        {isLogin ? (
          <button onClick={(e) => handleLogin(e)}>
            {loading ? "Loging In..." : "Login"}
          </button>
        ) : (
          <button onClick={(e) => handleSignUp(e)}>
            {loading ? "Creating..." : "Create new account"}
          </button>
        )}
        <TailwindToaster />
        {isLogin ? (
          <div
            className="createAccountText"
            onClick={() => setIsLogin(!isLogin)}
          >
            Create new account
          </div>
        ) : (
          <div
            className="createAccountText"
            onClick={() => setIsLogin(!isLogin)}
          >
            Login
          </div>
        )}
      </div>
    </form>
  );
};

export default Auth;
