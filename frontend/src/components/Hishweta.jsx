import React from "react";
import Shweta from '../assets/images/Advocate.jpg'

const Hishweta = ({heading,paragraph}) => {
  return (
    <div>
      {" "}
      <div className="bg">
        <div className="herotext">
          <h1>{heading}</h1>
          <p>{paragraph}</p>
        </div>
        <div className="image-container" >
          <img
            src={Shweta}
            alt="Shweta"
            className="rounded-image"

          />
        </div>
      </div>
    </div>
  );
};

export default Hishweta;
