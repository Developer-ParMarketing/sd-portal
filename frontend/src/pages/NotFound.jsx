// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import Hishweta from "../components/Hishweta";
import Usernavbar from "../components/Usernavbar";
import NotFoundImage from "../assets/images/404 Page Error.png"; // Ensure this path is correct

const NotFound = () => (
  <>
    <Usernavbar />
    <Hishweta
      heading={"Page Not Found"}
      paragraph={"It seems you've reached a page that doesn't exist."}
    />
    <div className="maindiv" style={{ padding: "20px", background: "#f8f9fa" }}>
      <div
        className="card1 mx-auto shadow border-0 text-center"
        style={{
          maxWidth: "600px",
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        <img
            src={NotFoundImage}
          alt="Page Not Found"
          style={{
            width: "100%",
            height: "auto",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
        <div style={{ padding: "30px" }}>
          <h2
            style={{
              color: "#dc3545",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Oops! Page Not Found
          </h2>
          <p style={{ color: "#6c757d", marginBottom: "20px" , fontWeight:'bold'}}>
            It seems you've reached a page that doesn't exist.
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              className="btn btn-danger btn-lg d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "20px",
                padding: "10px 30px",
                fontSize: "1.2rem",
                margin: "10px 0",
                width:'100%'
              }}
            >
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default NotFound;
