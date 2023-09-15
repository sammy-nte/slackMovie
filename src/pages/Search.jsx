import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { getSearchedMovies } from "../api";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

export function loader({ params }) {
  return getSearchedMovies(params.movie);
}

export default function Search() {
  const params = useParams();
  const searchData = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      if (searchData !== null) {
        const loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);
      }
    },
    [searchData]
  );

  if (loading) {
    return <Loading />;
  }

  const searchedCards = searchData.map(movie =>
    <MovieCard
      key={movie.id}
      title={movie.original_title}
      releaseDate={movie.release_date}
      rating={movie.vote_average}
      id={movie.id}
      poster={movie.poster_path}
      name={movie.name}
    />
  );
  return (
    <section>
      <h2
        style={{
          textAlign: "center",
          padding: "1em 0",
          fontSize: "2rem",
          textTransform: "capitalize"
        }}
      >
        Your Search: {params.movie}
      </h2>
      <section className="grid-posters">
        {searchedCards}
      </section>
    </section>
  );
}
