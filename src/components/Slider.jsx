import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/style.css";
import RatingSvg from "./svgs/RatingSvg";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function Slider({ movieSlider }) {
  const slideCards = movieSlider.map(movie =>
    <SwiperSlide
      className="slider"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`
      }}
      key={movie.id}
    >
      <div className="details">
        <h2 className="slider-movie-title">
          {movie.title}
        </h2>
        <div className="rates-area">
          <RatingSvg size="20px" fillColor="white" />
          <span className="slider-movie-rating">
            {movie.vote_average}/10
          </span>
        </div>
        <p className="slider-movie-paragraph">
          {movie.overview}
        </p>
      </div>
    </SwiperSlide>
  );

  return (
    <div>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
      >
        {slideCards}
      </Swiper>
    </div>
  );
}
