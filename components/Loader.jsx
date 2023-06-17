import React from "react";

export default function Loader({ loader }) {
  return (
    <div className="m-0 p-0">
      {loader === "loader_1" ? (
        <div className="loader_1"></div>
      ) : (
        <div className="loader_2"></div>
      )}
    </div>
  );
}
