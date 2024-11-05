import React, { useContext, useEffect } from "react";
import Hishweta from "../components/Hishweta";
import Usernavbar from "../components/Usernavbar";
import "aos/dist/aos.css"; // Import AOS CSS
import AOS from "aos"; // Import AOS Library
import {
  Imgone,
  Imgtwo,
  Imgthree,
  Imgfour,
  Imgfive,
  Imgsix,
} from "../assets/images/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Offer = () => {
  const location = useLocation(); // Get the current location and data passed from the Card component
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { url, user, getToken } = useContext(AppContext);

  // Retrieve data from location state or localStorage as fallback
  const { title, emi, oneTimeFee } = location.state || {};
  const calculatedEMI = localStorage.getItem("calculatedEMI");
  const subscription = localStorage.getItem("subscription");
  const totalbil = localStorage.getItem("totalbil");

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with 1s duration
  }, []);

  // Styles for the component
  const headerStyle = {
    textAlign: "center",
    color: "#e74c3c",
    fontSize: "2.5rem",
    marginBottom: "30px",
    fontWeight: "bold",
  };

  const mainDivStyle = {
    // backgroundColor: "#f9f9f9",
    // padding: "40px",
    // borderRadius: "10px",
    // boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
  };

  const offerCardStyle = {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardFrontStyle = {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "400px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
  };

  const offerImageContainerStyle = {
    height: "150px",
    overflow: "hidden",
  };

  const offerTitleStyle = {
    fontSize: "1.6rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  const offerDescriptionStyle = {
    fontSize: "1rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "15px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };

  const offerImageStyle = {
    width: "100%",
    height: "250px",
    // maxHeight: "120px",
    objectFit: "contain",
  };

  const buttonStyle = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    display: "block",
    margin: "0 auto",
  };

  const offersData = [
    {
      title: "Boost Your Credit Score",
      description:
        "Enroll in our Debt Management Plan (DMP) to improve your credit score, without affecting your credit report like loan settlements do.",
      image: Imgone,
    },
    {
      title: "Access to Future Loans",
      description:
        "Completing your DMP strengthens your credit profile, making you eligible for future loans.",
      image: Imgtwo,
    },
    {
      title: "Shield from Creditor Harassment & Legal Protection",
      description:
        "We handle all creditor communications and legal matters, including harassment, notices, arbitration, and court representation, keeping you protected 24/7.",
      image: Imgfive,
    },
    {
      title: "Personalized Financial Support",
      description:
        "Get a dedicated relationship manager for customized budgeting and financial advice.",
      image: Imgthree,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your payment progress in real time through our app and online portal.",
      image: Imgsix,
    },
  ];

  // Handler to navigate to the payment page
  const handleContinue = () => {
    navigate("/termsconditions", {
      state: {
        title,
        calculatedEMI,
        subscription,
        oneTimeFee,
        totalbil,
        emi,
      },
    });
  };

  return (
    <>
      <Usernavbar />
      <div className="container py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Explore the Benefits You'll Gain with Our App"}
        />
        {user?.Enroll_Payment_Status === "Paid" ? (
          <>
            {" "}
            <div
              style={{
                textAlign: "center",
                marginTop: "50px", // Increased top margin
                padding: "30px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "500px",
                margin: "0 auto", // Center align horizontally
                zIndex: "-1px",
              }}
              className="maindiv my-5"
            >
              <h2
                style={{
                  color: "#28a745",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                🎉 Payment Successful!
              </h2>
              <p style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}>
                Your payment has been completed successfully. You’re one step
                closer to financial freedom!
              </p>
              <Link to="/hold">
                <button
                  style={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    color: "#fff",
                    backgroundColor: "#28a745",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s",
                  }}
                  className="procBtn"
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#218838")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#28a745")
                  }
                >
                  Go to Hold Page
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="maindiv" style={mainDivStyle}>
              <h1 style={headerStyle}>OFFERS</h1>

              {/* <div className="offers-grid ">
                {offersData.map((offer, index) => (
                  <div
                    key={index}
                    className="offer-card"
                    style={offerCardStyle}
                    data-aos="fade-up"
                  >
                    <div style={cardFrontStyle} className="">
                      <div style={offerImageContainerStyle}>
                        <img
                          src={offer.image}
                          alt={offer.title}
                          style={offerImageStyle}
                        />
                      </div>
                      <h2 style={offerTitleStyle} className="text-danger">
                        {offer.title}
                      </h2>
                      <p style={offerDescriptionStyle}>{offer.description}</p>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className=" mx-auto w-full h-screen flex items-center justify-center p-4">
                <div className=" mx-auto w-full ">
                  <div className="stepcard ">
                    <div className="header1 d-flex flex-column flex-md-row align-items-center align-items-md gap-2 gap-md-4">
                      <div className="icon">
                        <img src={Imgone} alt="" style={offerImageStyle} />
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 ">
                        <div
                          style={{
                            color: "#ff4855", // Heading color red
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          Boost Your Credit Score
                        </div>
                        <div
                          className="py-3"
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal", // Normal font weight for text
                          }}
                        >
                          Enroll in our Debt Management Plan (DMP) to improve
                          your credit score, without affecting your credit
                          report like loan settlements do.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto w-full">
                  <div className="stepcard ">
                    <div className="header1 d-flex flex-column-reverse flex-md-row align-items-center align-items-md gap-2 gap-md-4">
                      <div className="col-12 col-md-6 col-lg-6">
                        <div
                          style={{
                            color: "#ff4855", // Heading color red
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          Access to Future Loans
                        </div>
                        <div
                          className="py-3"
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal", // Normal font weight for text
                          }}
                        >
                          Completing your DMP strengthens your credit profile,
                          making you eligible for future loans.
                        </div>
                      </div>
                      <div className="icon">
                        <img src={Imgtwo} alt="" style={offerImageStyle} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto w-full">
                  <div className="stepcard ">
                    <div className="header1 d-flex flex-column flex-md-row align-items-center align-items-md gap-2 gap-md-4">
                      <div className="icon">
                        <img src={Imgfive} alt="" style={offerImageStyle} />
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div
                          style={{
                            color: "#ff4855", // Heading color red
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          Shield from Creditor Harassment & Legal Protection
                        </div>
                        <div
                          className="py-3"
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal", // Normal font weight for text
                          }}
                        >
                          We handle all creditor communications and legal
                          matters, including harassment, notices, arbitration,
                          and court representation, keeping you protected 24/7.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto w-full">
                  <div className="stepcard ">
                    <div className="header1 d-flex flex-column-reverse flex-md-row align-items-center align-items-md gap-2 gap-md-4">
                      <div className="col-12 col-md-6 col-lg-6">
                        <div
                          style={{
                            color: "#ff4855", // Heading color red
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          Personalized Financial Support
                        </div>
                        <div
                          className="py-3"
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal", // Normal font weight for text
                          }}
                        >
                          Get a dedicated relationship manager for customized
                          budgeting and financial advice.
                        </div>
                      </div>
                      <div className="icon">
                        <img src={Imgthree} alt="" style={offerImageStyle} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mx-auto w-full">
                  <div className="stepcard ">
                    <div className="header1 d-flex  flex-column flex-md-row align-items-center align-items-md gap-2 gap-md-4">
                      <div className="icon">
                        <img src={Imgsix} alt="" style={offerImageStyle} />
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div
                          style={{
                            color: "#ff4855", // Heading color red
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          Real-Time Tracking
                        </div>
                        <div
                          className="py-3"
                          style={{
                            fontSize: "16px",
                            fontWeight: "normal", // Normal font weight for text
                          }}
                        >
                          Track your payment progress in real time through our
                          app and online portal.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto">
                {/* <div style={{ marginBottom: "20px", textAlign: "center" }}>
              {title && <h2>{title} Months Plan</h2>}
              {emi && <p>Monthly EMI: {emi}</p>}
              {oneTimeFee && <p>One Time Fee: ₹{oneTimeFee}</p>}
            </div> */}

                <button style={buttonStyle} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Additional CSS */}
      <style jsx>{`
        .offers-grid {
          display: flex;
          flex-wrap: wrap; /* Allow wrapping to the next line */
          justify-content: center; /* Center the items in the container */
          gap: 30px;
        }

        .offer-card {
          flex: 1 1 300px; /* Flex-grow and flex-shrink with a minimum size of 300px */
          max-width: 300px; /* Ensure cards don’t stretch too wide */
        }

        @media (max-width: 768px) {
          .offers-grid {
            justify-content: center; /* Ensure the cards are centered on smaller screens */
          }

          .offer-card {
            flex: 1 1 100%; /* Full width on smaller screens */
          }

          h1 {
            font-size: 1.8rem;
          }

          .offer-card h2 {
            font-size: 1.5rem;
            margin-bottom: 5px;
          }

          .offer-card p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Offer;
