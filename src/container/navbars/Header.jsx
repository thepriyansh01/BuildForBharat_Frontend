/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./header.css";
import logo from "../../assets/shoptalk.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { routes } from "../../routes/routes";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { dispatch, isAuthenticated } = useContext(AuthContext);
  const { dispatchSearch } = useContext(SearchContext);

  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isActiveNavOption, setIsActiveNavOption] = useState(false);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(
        `/search?searchString=${encodeURIComponent(searchValue.trim())}`
      );
    }
    setFilteredSuggestions([]);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const fetchSuggestions = async () => {
    if (searchValue && searchValue !== undefined && searchValue !== "")
      try {
        const response = await axios.get(
          `${routes.auth}/product/searchSuggestions/${searchValue}`
        );
        setFilteredSuggestions(response.data);
      } catch (error) {
        setFilteredSuggestions([]);
      }
  };

  useEffect(() => {
    if (searchValue === "") return;
    dispatchSearch({
      type: "NEW_SEARCH",
      payload: searchValue,
    });
    if (
      searchValue === null ||
      searchValue === "" ||
      searchValue === undefined
    ) {
      setFilteredSuggestions([]);
      dispatchSearch({
        type: "RESET_SEARCH",
      });
    }
  }, [searchValue]);

  useEffect(() => {
    fetchSuggestions();
    if (searchValue === "") setFilteredSuggestions([]);
  }, [searchValue]);

  useEffect(() => {
    if (location.pathname === "/search") {
      const searchParams = new URLSearchParams(location.search);
      const searchStringFromLocation = searchParams.get("searchString");
      setSearchValue(searchStringFromLocation);
    } else {
      setSearchValue("");
    }
  }, [location]);
  useEffect(() => {
    const handleClick = (e) => {
      const searchDiv = document.getElementById("search-input");

      if (searchDiv && searchDiv.contains(e.target)) {
        setIsActiveSearch(true);
      } else {
        setIsActiveSearch(false);
      }
      const userIconDiv = document.getElementById("user-icon");

      if (userIconDiv && userIconDiv.contains(e.target)) {
        setIsActiveNavOption(true);
      } else {
        setIsActiveNavOption(false);
      }
    };
    document.addEventListener("click", handleClick);
    // return () => {
    //   removeEventListener("click", handleClick);
    // };
  });

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <Link to="/" className="logo_wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="website-name">ShopTalk</div>
      </Link>
      {isAuthenticated && (
        <div
          className={`search-bar ${
            filteredSuggestions.length > 0 && isActiveSearch ? "active" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className={`search-bar-input ${
              filteredSuggestions.length > 0 && isActiveSearch ? "active" : ""
            }`}
            value={searchValue}
            id="search-input"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              } else if (e.key === "Escape") {
                setIsActiveSearch(false);
              }
            }}
          />
          {searchValue !== "" && (
            <div
              className={`search-bar-btn ${
                filteredSuggestions.length > 0 && isActiveSearch ? "active" : ""
              }`}
              onClick={handleClearSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          )}
          <div
            className={`search-bar-btn ${
              filteredSuggestions.length > 0 && isActiveSearch ? "active" : ""
            }`}
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>

          {filteredSuggestions.length > 0 && isActiveSearch && (
            <div className="suggestion-list">
              {filteredSuggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="suggestion-item-wrapper"
                  onClick={() => {
                    navigate(
                      `/search?searchString=${encodeURIComponent(
                        suggestion.trim()
                      )}`
                    );
                  }}
                >
                  <div className="suggestion-item">
                    {suggestion.slice(0, 80)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {isAuthenticated && (
        <div className="user-profile" id="user-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-person-lines-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
          </svg>
          {isActiveNavOption && (
            <div className="navOptions">
              {/* <div className="option">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <div>Profile</div>
              </div> */}
              <Link
                className="option"
                onClick={() => logout()}
                aria-current="page"
                to="/auth"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                <div>Logout</div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Header;
