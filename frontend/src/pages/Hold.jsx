import React, { useContext, useEffect, useState } from "react";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import "../assets/css/encouragement.css";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Hold = () => {
  const navigate = useNavigate();
  const recordId = localStorage.getItem("recordId");
  const { url, getToken, user } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [invoicePaymentData, setInvoicePaymentData] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Log user's Enroll_Payment_Status for debugging
    // console.log("User Enroll_Payment_Status:", user?.Enroll_Payment_Status);
    handlePaymentCompletion();
    // Check if the user is active
    if (user?.Account_Status !== "Active") {
      // console.log("User is not authorized to view this page.");
      // handleUserStepNavigation();
    } else {
      checkPaymentStatus();
    }
  }, [user, navigate]);

  const checkPaymentStatus = async () => {
    try {
      const token = await getToken();
      const apiUrl = `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Invoice_Payment/search?criteria=(Lead_Name:equals:${recordId})`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
      });

      const paymentData = response.data.data.find(
        (item) => item.Payment_Number === 1
      );
      // console.log("Payment data:", paymentData);

      // if (user && user.Enroll_Payment_Status === "paid") {
      //   setPaymentStatus("paid");
      //   navigate("/hold");

      //   fetchInvoicePaymentData(token); // Fetch invoice payment data if paid
      // } else {
      //   console.log("User has not paid.");
      //   navigate("/payment"); // Redirect to the appropriate step
      // }
    } catch (error) {
      console.error("Error checking payment status", error);
      navigate("/registrationfflow"); // Redirect on error as well
    }
  };

  const fetchInvoicePaymentData = async (token) => {
    try {
      if (recordId) {
        const apiUrl = `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Invoice_Payment/search?criteria=${recordId}`;
        // console.log(`Fetching invoice payment data from: ${apiUrl}`);

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        });

        setInvoicePaymentData(response.data);
        // console.log("Invoice Payment Data:", invoicePaymentData);

        navigate("/hold"); // Navigate to Hold page after fetching data if payment is confirmed
      }
    } catch (error) {
      console.error(
        "Error fetching invoice payment data",
        error.response ? error.response.data : error
      );
      setError("Failed to fetch invoice payment data.");
    }
  };

  const handlePaymentCompletion = async () => {
    try {
      const token = await getToken();
      const newApiUrl = `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Invoice_Payment/search?criteria=((Lead_Name:equals:${recordId}))`;

      const response = await axios.get(newApiUrl, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.data && Array.isArray(response.data.data)) {
        const paymentData = response.data.data.find(
          (item) => item.Payment_Number === 1
        );

        if (paymentData) {
          setIsButtonEnabled(true);
          setPaymentLink(paymentData.URL_1);
        } else {
          setIsButtonEnabled(false);
          setPaymentLink("");
        }
      } else {
        // console.log("No payment data available.");
        setIsButtonEnabled(false);
        setPaymentLink("");
      }
    } catch (error) {
      console.error(
        "Error fetching new payment data",
        error.response ? error.response.data : error
      );
      setError("Failed to fetch new payment data.");
    }
  };

  return (
    <>
      <Usernavbar />
      <div className="container py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />

        {user?.Enroll_Payment_Status === "Paid" ? (
          <div
            className="maindiv"
            style={{ padding: "20px", background: "#f8f9fa" }}
          >
            <div
              className="card1 mx-auto shadow border-0"
              style={{
                maxWidth: "600px",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div
                className="card-body text-center"
                style={{ padding: "20px" }}
              >
                <h2
                  className="card-title text-danger"
                  style={{ fontSize: "2rem", marginBottom: "10px" }}
                >
                  🎉 Great News!
                </h2>
                <p
                  className="card-text"
                  style={{ fontSize: "1.2rem", margin: "20px 0" }}
                >
                  Thank You for Enrolling in Our DMP
                </p>
                <p
                  className="card-text"
                  style={{ fontSize: "1rem", margin: "20px 0" }}
                >
                  Thank you for enrolling in our{" "}
                  <strong>Debt Management Plan (DMP)</strong> to begin your
                  journey towards becoming debt-free and improving your credit
                  score.
                </p>

                {invoicePaymentData && (
                  <div>
                    <p>
                      Invoice Payment Data: {JSON.stringify(invoicePaymentData)}
                    </p>
                  </div>
                )}

                {/* <p
                  className="card-text"
                  style={{ fontSize: "1.2rem", margin: "20px 0" }}
                >
                  Your DMP benefits are now ready to be activated. To start
                  enjoying the benefits, please make your first EMI payment
                  using the link below:
                </p> */}

                <div className="position-relative">
                  {/* <a
                    href={paymentLink || "#"}
                    className="btn btn-danger btn-lg d-flex align-items-center justify-content-center"
                    style={{
                      borderRadius: "20px",
                      padding: "10px 30px",
                      fontSize: "1.2rem",
                      margin: "10px 0",
                      opacity: paymentLink ? 1 : 0.5,
                      pointerEvents: paymentLink ? "auto" : "none",
                    }}
                  >
                    {paymentLink?"pay Later":"Link is not generated connect with us 02268762605"}
                  </a> */}

                  {/* Tooltip */}
                  {/* {!paymentLink && (
                    <span className="paylater"
                      style={{
                        position: "absolute",
                        bottom: "100%", // Position above the button
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#333", // Dark background for the tooltip
                        color: "#fff", // White text
                        padding: "5px 10px",
                        borderRadius: "5px",
                        visibility: "visible",
                        opacity: 0.8,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Payment link is not available yet. Please Connect with us 122.
                    </span>
                  )} */}
                </div>

                <h2
                  className="text-muted"
                  style={{ fontSize: "1.5rem", margin: "10px 0" }}
                >
                  Please Contact your financial advisor for further DMP Process{" "}
                  
                  <br />{" "}
                  <button
                    style={{
                      padding: "12px 24px",
                      marginTop:'10px',
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
                    onClick={() => window.location.href = "tel:+912268762605"}

                  >
                    Contact Us 
                  </button>
                  {/* 02268762605 */}
                </h2>

                {/* <button
                  onClick={handlePaymentCompletion}
                  className="btn btn-success"
                >
                  Fetch New Payment Data
                </button> */}

                <footer style={{ marginTop: "20px", fontSize: "1rem" }}>
                  <strong className="card-title text-danger">Thank you!</strong>
                </footer>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="maindiv"
            style={{ padding: "20px", background: "#f8f9fa" }}
          >
            <div
              className="card1 mx-auto shadow border-0"
              style={{
                maxWidth: "600px",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div
                className="card-body text-center"
                style={{ padding: "20px" }}
              >
                <h2
                  className="card-title text-danger"
                  style={{ fontSize: "2rem", marginBottom: "10px" }}
                >
                  Complete The Payment !
                </h2>
                <p
                  className="card-text"
                  style={{ fontSize: "1.2rem", margin: "20px 0" }}
                >
                  Thank You for Enrolling in Our DMP
                </p>
                <p
                  className="card-text"
                  style={{ fontSize: "1rem", margin: "20px 0" }}
                >
                  Thank you for visiting in our{" "}
                  <strong>Debt Management Plan (DMP)</strong> to begin your
                  journey towards becoming debt-free and improving your credit
                  score.
                </p>

                <footer style={{ marginTop: "20px", fontSize: "1rem" }}>
                  <strong className="card-title text-danger">Thank you!</strong>
                </footer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hold;
