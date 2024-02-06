/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload);
      return {
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



// import { createContext, useEffect, useReducer } from "react";

// const INITIAL_STATE = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   loading: false,
//   error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return {
//         user: null,
//         loading: true,
//         error: null,
//       };
//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case "LOGIN_FAILURE":
//       return {
//         user: null,
//         loading: false,
//         error: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         user: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
//   }, [state.user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         loading: state.loading,
//         error: state.error,
//         dispatch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };