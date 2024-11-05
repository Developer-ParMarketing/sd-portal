import React from "react";

const Loading = () => {
  return (
    <>
      <div className="text-center d-flex align-items-center justify-content-center gap-2 mt-4">
        <h2>Loading</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
