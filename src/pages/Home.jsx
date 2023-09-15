import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getTopMovies } from "../api";
import { useLoaderData } from "react-router";
import Loading from "../components/Loading";

export function loader() {
  return getTopMovies();
}

export default function Home() {
  const topMovies = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topMovies !== null) {
      const loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(loadingTimeout);
    }
  }, [topMovies]);

  if (loading) {
    return <Loading />;
  }

  const cards = topMovies.map((movie) => (
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
    <section>
      <h2 style={{ textAlign: "center", padding: "1em 0", fontSize: "2rem" }}>
        Top Movies
      </h2>
      <section className="grid-posters">{cards}</section>
    </section>
  );
}
