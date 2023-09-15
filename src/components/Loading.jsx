import React from "react";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loader-container">
      <PropagateLoader color="#00BFFF" size={90} />
    </div>
  );
};

export default Loading;
