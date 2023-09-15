import React from "react";
import NoResultsSvg from "../components/svgs/NoResultsSvg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="no-page">
      <NoResultsSvg />
      <p>Page Not Found</p>
      <Link to="/">
        <button className="go-home">Go to Home</button>
      </Link>
    </div>
  );
}
