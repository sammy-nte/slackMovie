import React, { useEffect, useState } from "react";
import RatingSvg from "./svgs/RatingSvg";
import { Link } from "react-router-dom";
import Heart from "./svgs/Heart";

export default function MovieCard({
  id,
  title,
  rating,
  poster,
  releaseDate,
  name,
  search
}) {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const apiKey = "d4e65ba45b1f218980c2a7a7143f0e01";
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => setGenres(response.genres))
      .catch(err => console.log(err));
  }, []);

  const genreTexts = genres.map(genre =>
    <li key={genre.id} className="movie-card--genre-list-items">
      {genre.name}
    </li>
  );
  return (
    <div data-testid="movie-card" className="movies-card">
      <Heart id={id} />
      <Link className="li" to={`/movies/${id}`} state={search}>
        <div className="image-container">
          <img
            data-testid="movie-poster"
            className="card-image"
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={title ? title : name}
          />
        </div>
        <div className="description">
          <p className="movies-card--date" data-testid="movie-release-date">
            {releaseDate.substring(0, 4)}
          </p>
          <p className="movies-card--title" data-testid="movie-title">
            {title ? title : name}
          </p>
          <div className="rating">
            <div className="imdb-rating">
              <RatingSvg size="20px" fillColor="black" />{" "}
              <span>{rating.toFixed(1)}/10</span>
            </div>
            <div className="tomato-score">
              <span>
                {(rating.toFixed(1) / 10 * 100).toFixed(1)}
              </span>
            </div>
          </div>
          <ul className="movie-card--genre-list">
            {genreTexts}
          </ul>
        </div>
      </Link>
    </div>
  );
}
