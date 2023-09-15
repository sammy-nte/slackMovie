import React from "react";
import { Outlet, useLoaderData } from "react-router";
import Slider from "../components/Slider";
import { getSliderMovies } from "../api";
import SearchArea from "../components/SearchArea";

export function loader() {
  return getSliderMovies();
}
export default function Layout() {
  const movieSlider = useLoaderData();
  return (
    <section>
      <Slider movieSlider={movieSlider} />
      <SearchArea />
      <Outlet />
      <div className="footer">
        <div className="links">
          <div className="text-wrapper">Conditions of Use</div>
          <div className="text-wrapper">Privacy &amp; Policy</div>
          <div className="text-wrapper">Press Room</div>
        </div>
        <p className="div">© 2021 SamsMovies</p>
      </div>
    </section>
  );
}
