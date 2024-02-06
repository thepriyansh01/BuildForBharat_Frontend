import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  searchString: null,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH": {
      return {
        searchString: action.payload,
      };
    }
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatchSearch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        searchString: state.searchString,
        dispatchSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
