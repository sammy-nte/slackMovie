import React, { useEffect, useState } from "react";
import { getMovieById } from "../api";
import MovieCard from "../components/MovieCard";
import SearchArea from "../components/SearchArea";
import Loading from "../components/Loading";

export default function Favorites() {
  const favMovies = JSON.parse(localStorage.getItem("favorite-list"));
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieDataArray = await Promise.all(
          favMovies.map(async (movie) => {
            return await getMovieById(movie);
          })
        );

        setMovieData(movieDataArray);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false); 
      }
    };

    if (favMovies && favMovies.length > 0) {
      fetchMovieData();
    } else {
      setLoading(false); 
    }
  }, [favMovies]);

  if(loading){
    return <Loading />
  }

  const cards = movieData.map(movie => (
    <MovieCard
      key={movie.id}
      title={movie.original_title}
      releaseDate={movie.release_date}
      rating={movie.vote_average}
      id={movie.id}
      poster={movie.poster_path}
      name={movie.name}
    />
  ));

  return (
    <>
    <SearchArea />
    <div className="fav-banner">
    </div>
    <section className="grid-posters">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        movieData.length > 0 ? (
          cards
        ) : (
          <p className="no-fav">No favorite movies found :(</p>
        )
      )}
    </section>
    </>
  );
}