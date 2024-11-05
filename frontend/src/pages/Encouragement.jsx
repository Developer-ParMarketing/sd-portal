import React from "react";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import "../assets/css/encouragement.css";
import { Encourage } from "../assets/images";

const Encouragement = () => {
  return (
    <>
      <Usernavbar />
      <div className="container py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
        <div className="maindiv d-flex justify-content-center align-items-center">
          <div
            className="card mx-auto shadow border-0"
            style={{
              width: "100%", // Set the width to 100% for responsiveness
              maxWidth: "450px", // Maintain max width
              borderRadius: "15px",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="card-body text-center" style={{ padding: "20px" }}>
              <div
                className="card-header text-center text-white"
                style={{
                  borderRadius: "15px 15px 0 0",
                  padding: "20px",
                  backgroundColor: "#ed2224",
                  borderBottom: "1px solid white",
                }}
              >
                <h2
                  className="card-title"
                  style={{ fontSize: "1.75rem", marginBottom: "10px" }}
                >
                  Say goodbye to debt stress!
                </h2>
              </div>
              <img
                src={Encourage}
                alt=""
                style={{ width: "100%", height: "auto", marginBottom: "20px" }} // Make the image responsive
              />
              <p
                className="card-text "
                style={{
                  fontSize: "1.5rem",
                  margin: "20px 0",
                  fontWeight: "bolder",
                  color: "red",
                }}
              >
                Join India’s 1st and only platform to:
              </p>

              <ul
                className="list-group list-group-flush"
                style={{
                  textAlign: "left",
                  margin: "0 auto",
                  maxWidth: "100%", // Allow list to use full width
                }}
              >
                {[
                  "Become debt-free",
                  "Boost your credit score",
                  "Cut your EMI payments in half",
                  "Get legal protection from creditor visits and harassment",
                  "Shield your friends and family from creditor contact",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex align-items-center"
                    style={{ padding: "10px 15px" }}
                  >
                    <span
                      className=""
                      style={{
                        fontSize: "1.5rem",
                        marginRight: "10px",
                        color: "red",
                      }}
                    >
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="text-center my-4">
                <button
                  className="btn-lg"
                  style={{
                    borderRadius: "20px",
                    padding: "10px 30px",
                    fontSize: "1.2rem",
                    background: "#ed2224",
                    color: "white",
                    width: "100%", // Make button full width
                    maxWidth: "300px", // Max width for the button
                  }}
                >
                  Enroll now for only ₹599!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Encouragement;
