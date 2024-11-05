import React, { useContext, useEffect, useState } from "react";
import Usernavbar from "../components/Usernavbar";
import CardCarousel from "../components/CardCarousel ";
import debtsol from "../assets/images/Imgfive.png";
import Imgfour from "../assets/images/Imgfour.png";
import Imgsix from "../assets/images/Imgsix.png";
import Imgtwo from "../assets/images/Imgtwo.png";
import Hishweta from "../components/Hishweta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import { AppContext } from "../context/AppContext";

const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, user, getToken } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title1: "",
    text1: "",
    title2: "",
    text2: "",
  });

  const handleShowModal = (subItem) => {
    setModalData(subItem);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const {
    totalIncome,
    monthlyExpenses,
    unsecuredCreditors,
    totalDebts,
    totalEMI,
    harassmentType,
    legalAction,
  } = location.state || {};

  const handleNavigateToPayment = () => {
    navigate("/payment", {
      state: {
        totalIncome,
        monthlyExpenses,
        unsecuredCreditors,
        totalDebts,
        totalEMI,
        harassmentType,
        legalAction,
      },
    });
  };

  const headerStyle = {
    textAlign: "center",
    color: "red",
  };

  const cardContent = [
    {
      title: "1 Debt Solution Plan",
      text: "It’s looking good, We’ve found 4 debt and 2 harassment solutions that match your profile based on the information you have provided.",
      imgSrc: Imgfour,
      imgAlt: "Debt Solutions",
    },
    {
      title: "2 Debt Management Plan",
      text: "Our lawyers will negotiate with all your creditors a structured repayment plan that consolidates all unsecured debts into a single monthly payment.",
      imgSrc: Imgsix,
      imgAlt: "Debt Solutions",
    },
    {
      title: "3 Harassment Solutions",
      text: "We’ll handle all calls for you, prevent creditors from contacting your friends and family.",
      imgSrc: debtsol,
      imgAlt: "Debt Solutions",
      subTitles: [
        {
          title1: "Shield from Creditor Calls",
          text1: "We protect you from aggressive creditor calls.",
          additionalData1: "Legal support to handle all calls.",
          title2: "Full Legal Coverage",
          text2: "Comprehensive legal protection against harassment.",
          additionalData2: "Includes representation in court if necessary.",
        },
      ],
    },
    {
      title: "Our Fees",
      text: "We believe in flexible pricing based on your affordability. We charge the equivalent of your first two months' EMIs.",
      imgSrc: Imgtwo,
      imgAlt: "Debt Solutions",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={" Your Harassment and Debt Solutions"}
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
            <div className="maindiv">
              <h1 style={headerStyle}>Harassment and Debt Solutions</h1>

              <div className="container py-4">
                <div className="row justify-content-center">
                  {cardContent.map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
                      data-aos="fade-up"
                    >
                      <div
                        className="shadow-lg border-0 rounded-lg bg-white"
                        style={{
                          background: "#fff", // Card background white
                          maxWidth: "320px",
                          borderRadius: "15px",
                          padding: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a card-like appearance
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div className="text-center p-3">
                          <h2
                            className="mb-3"
                            style={{
                              color: "#ff4855", // Heading color red
                              fontSize: "24px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.title}
                          </h2>

                          <div className="d-flex flex-column align-items-center mb-4">
                            {item.imgSrc && (
                              <img
                                src={item.imgSrc}
                                alt={item.imgAlt}
                                className="img-fluid mb-3"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                }}
                              />
                            )}
                            <p
                              className="text-dark text-left" // Normal text style
                              style={{
                                fontSize: "16px",
                                fontWeight: "normal", // Normal font weight for text
                              }}
                            >
                              {item.text}
                            </p>
                          </div>

                          {item.subTitles && (
                            <div className="mb-3">
                              <button
                                className="btn btn-outline-danger" // Keeping button consistent with red theme
                                onClick={() =>
                                  handleShowModal(item.subTitles[0])
                                }
                              >
                                Read More
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal */}
                {showModal && (
                  <div
                    className="modal show"
                    tabIndex="-1"
                    style={{
                      display: "block",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                      animation: "fadeIn 0.3s ease-in-out", // Subtle fade-in animation
                    }}
                    role="dialog"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      style={{
                        maxWidth: "600px",
                        animation: "scaleUp 0.3s ease-in-out", // Slight scale-up effect on modal appearance
                      }}
                    >
                      <div
                        className="modal-content"
                        style={{
                          borderRadius: "20px", // Softer rounded corners
                          border: "2px solid red", // Red border for emphasis
                          background: "white", // White background for modal content
                          color: "red", // Primary text color
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", // Soft shadow for the modal
                        }}
                      >
                        <div
                          className="modal-header"
                          style={{
                            borderBottom: "1px solid red", // Red accent divider for header
                            paddingBottom: "15px",
                            display: "flex", // Use flex to space out title and close button
                            justifyContent: "space-between", // Space between title and close button
                            alignItems: "center", // Center alignment vertically
                          }}
                        >
                          <h5
                            className="modal-title text-center"
                            style={{
                              color: "red", // Title color
                              fontSize: "24px", // Title font size
                              fontWeight: "800", // Increased font weight
                              textTransform: "uppercase", // Uppercase for impact
                              letterSpacing: "1px", // Add letter spacing
                              padding: "0px 0", // Padding for spacing
                            }}
                          >
                            {modalData.title1} & {modalData.title2}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleCloseModal}
                            style={{
                              background: "transparent",
                              border: "1px solid black",
                              fontSize: "24px",
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "red", // Close button color
                            }}
                          >
                            &times;
                          </button>
                        </div>

                        <div className="modal-body" style={{ padding: "20px" }}>
                          <h5
                            className="text-center" // Center subtitle
                            style={{
                              color: "red", // Subtitle color
                              fontSize: "20px", // Subtitle font size
                              fontWeight: "600", // Increased font weight
                              marginBottom: "10px",
                              textTransform: "uppercase", // Uppercase for emphasis
                              letterSpacing: "0.5px",
                            }}
                          >
                            {modalData.title1}
                          </h5>
                          <p
                            className="text-center" // Center text
                            style={{
                              color: "red", // Text color for contrast
                              fontSize: "16px",
                              lineHeight: "1.6", // Improved line spacing for readability
                              margin: "10px 0", // Vertical margin for spacing
                            }}
                          >
                            {modalData.text1}
                          </p>

                          <h5
                            className="text-center"
                            style={{
                              color: "red", // Subtitle color
                              fontSize: "20px", // Subtitle font size
                              fontWeight: "600", // Increased font weight
                              marginTop: "20px",
                              textTransform: "uppercase", // Uppercase for emphasis
                              letterSpacing: "0.5px",
                            }}
                          >
                            {modalData.title2}
                          </h5>
                          <p
                            className="text-center"
                            style={{
                              color: "red", // Text color for contrast
                              fontSize: "16px",
                              lineHeight: "1.6", // Line spacing for readability
                              margin: "10px 0", // Vertical margin for spacing
                            }}
                          >
                            {modalData.text2}
                          </p>
                        </div>

                        <div
                          className="modal-footer"
                          style={{
                            borderTop: "1px solid red", // Red accent divider for footer
                            display: "flex",
                            justifyContent: "center",
                            padding: "15px 0", // Padding for spacing
                          }}
                        >
                          <button
                            type="button"
                            className="btn"
                            onClick={handleCloseModal}
                            style={{
                              backgroundColor: "red", // Button background color
                              color: "white", // Button text color
                              borderRadius: "30px",
                              padding: "12px 30px", // More padding for button
                              fontWeight: "bold",
                              border: "none",
                              fontSize: "16px", // Button text size
                              transition: "background 0.3s ease", // Smooth transition for hover
                            }}
                            onMouseEnter={
                              (e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "tomato") // Change color on hover
                            }
                            onMouseLeave={
                              (e) =>
                                (e.currentTarget.style.backgroundColor = "red") // Revert on mouse leave
                            }
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <CardCarousel unsecured={totalDebts} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Description;
