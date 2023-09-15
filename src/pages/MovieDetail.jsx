import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import RatingSvg from "../components/svgs/RatingSvg";
import { getMovieById } from "../api";
import SearchArea from "../components/SearchArea";
import Loading from "../components/Loading";

export function loader({ params }) {
  return getMovieById(params.id);
}

export default function MovieDetail() {
  let array = JSON.parse(localStorage.getItem("favorite-list")) || [];

  const params = useParams();
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [addedToFav, setAddedToFav] = useState(false); 
  const favBtn = useRef();
  const movieDetail = data;
  const genres = data.genres;

  useEffect(() => {
    if (data !== null) {
      const loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(loadingTimeout);
    }
  }, [data]);

  useEffect(() => {
    setAddedToFav(array.includes(data.id));
  }, [array, data.id]);

  if (loading) {
    return <Loading />;
  }

  const g = genres.map((g) => (
    <div key={g.id} className="genres">
      <p key={g.id}>{g.name}</p>
    </div>
  ));

  function toggleFav() {
    if (!addedToFav) {
      array.push(data.id);
    } else {
      const index = array.indexOf(data.id);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
    localStorage.setItem("favorite-list", JSON.stringify(array));
    setAddedToFav(!addedToFav); 
  }

  const localDate = new Date(movieDetail.release_date); 
const utcDate = localDate.toISOString();


  return (
    <>
      <SearchArea />
      <section className="movie-details">
        <div className="main-content">
          {loading ? (
            <div>
              <svg id="loader" viewBox="25 25 50 50">
                <circle id="loader-circle" r="20" cy="50" cx="50" />
              </svg>
              <p>Loading</p>
            </div>
          ) : (
            <div className="main-content--child">
              <div id={movieDetail.id}>
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`,
                  }}
                  className="detail-image"
                />
                <div className="more">
                  <div
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.poster_path})`,
                    }}
                    className="poster"
                  />
                  <div className="des">
                    <div className="details-ratings">
                      <p className="detail-title" data-testid="movie-title">
                        {movieDetail.title}
                      </p>
                      <p data-testid="movie-release-date">
                        {utcDate}
                      </p>
                      <p data-testid="movie-runtime">
                        {movieDetail.runtime} mins
                      </p>
                      <p className="detail-rating">
                        <RatingSvg size="20px" fillColor="black" />
                        <span className="detail-rate">
                          {movieDetail.vote_average.toFixed(1)}/10
                        </span>
                      </p>
                    </div>
                    <div className="genres-list">{g}</div>
                    <button
                      ref={favBtn}
                      id={addedToFav ? "fav-added" : "fav-add"}
                      className="favorite-btn"
                      onClick={toggleFav}
                    >
                      {addedToFav
                        ? "Remove from favorite"
                        : "Add to favorite"}
                    </button>
                    <div className="detail-overview">
                      <p data-testid="movie-overview">
                        {movieDetail.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
