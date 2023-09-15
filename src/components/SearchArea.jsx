import React, { useEffect, useRef, useState } from "react";
import SearchSvg from "./svgs/SearchSvg";
import { Link } from "react-router-dom";

export default function SearchArea() {
  const header = useRef();
  const searchInput = useRef();
  const searchButton = useRef();
  const logo = useRef();
  const [searchQuery, setSearchQuery] = useState({
    movieSearch: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSearchQuery(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  function handleScroll() {
    const currentHeader = header.current;
    const currentInput = searchInput.current;
    const currentButton = searchButton.current;
    const currentLogo = logo.current;
    const scrollPosition = window.scrollY;
    if (scrollPosition >= "200") {
      currentHeader.style.background = "white";
      currentHeader.style.transition = "all 350ms ease";
      currentInput.style.color = "black";
      currentLogo.style.color = "#111827";
      currentButton.style.background = "rgb(209, 213, 219)";
    } else {
      currentHeader.style.background = "transparent";
      currentInput.style.color = "white";
      currentLogo.style.color = "white";
      currentButton.style.background = "transparent";
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={header} className="search-area">
      <Link className="logo"  to="/">
      
      <h2 ref={logo}>SamsMovies</h2>
      </Link>
      <form action="" className="forms">
        <input
          ref={searchInput}
          name="movieSearch"
          type="text"
          value={searchQuery.movieSearch}
          id="search-input"
          onChange={handleChange}
          placeholder="What do you want to watch?"
        />
        <Link to={`/search/${searchQuery.movieSearch}`}>
          <button
            ref={searchButton}
            className="search-btn"
          >
            <SearchSvg size="20px" />
          </button>
        </Link>
      </form>
      <Link to="/favorites">
      <button id="fav-btn">Favorites</button>
      </Link>
    </div>
  );
}
