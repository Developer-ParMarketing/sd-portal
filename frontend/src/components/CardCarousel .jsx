import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

// const Card = ({ title, emi, fee, oneTimeFee, total, unsecured }) => {
//   const calculatedEMI = unsecured
//     ? parseFloat((unsecured / title).toFixed(2)) // If unsecured, calculate based on unsecured value and title
//     : parseFloat(emi.replace(/[₹,]/g, "")) || 0; // If not, clean EMI of ₹ symbol and commas

//   const subscription = (calculatedEMI * 0.2).toFixed(2); // Calculate 20% of EMI

//   // Convert all relevant values to numbers and compute total
//   const totalbil =
//     calculatedEMI + parseFloat(subscription) + parseFloat(oneTimeFee || 0); // Calculate total by adding EMI, subscription, and one-time fee

//   localStorage.setItem("calculatedEMI", calculatedEMI);
//   localStorage.setItem("subscription", subscription);
//   localStorage.setItem("totalbil", totalbil);
//   return (
//     <div
//       className="card shadow-sm"
//       style={{
//         background: "linear-gradient(to right, #ff866a, #ff4865)",
//         height: "380px",
//         borderRadius: "10px",
//         padding: "1rem",
//       }}
//     >
//       <div
//         className="card-body text-white d-flex flex-column align-items-center"
//         style={{ padding: "1rem" }}
//       >
//         <h5
//           className="card-title text-center"
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//           }}
//         >
//           {title} Months Plan
//         </h5>
//         <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

//         <div
//           className="w-100 d-flex justify-content-between"
//           style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
//         >
//           <span>Monthly EMI:</span>
//           <strong>₹{calculatedEMI}</strong>
//         </div>
//         <div
//           className="w-100 d-flex justify-content-between"
//           style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
//         >
//           <span>Subscription:</span>
//           <strong>₹{subscription}</strong>
//         </div>
//         {oneTimeFee && (
//           <div
//             className="w-100 d-flex justify-content-between"
//             style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
//           >
//             <span>One Time Fee:</span>
//             <strong>₹{oneTimeFee}</strong>
//           </div>
//         )}

//         <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

//         <div
//           className="w-100 d-flex justify-content-between"
//           style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0.5rem 0" }}
//         >
//           <span>Total:</span>
//           <strong>₹{totalbil}</strong>
//         </div>

//         <Link
//           to="/offer"
//           state={{ title, emi, fee, oneTimeFee, total, calculatedEMI }}
//           style={{ textDecoration: "none" }}
//         >
//           <button
//             style={{
//               background: "#ffff", // Example background color
//               color: "#ff4865",
//               border: "none",
//               borderRadius: "5px",
//               padding: "10px 20px",
//               fontSize: "1rem",
//               fontWeight: "bolder",
//               cursor: "pointer",
//               display: "block",
//               margin: "20px auto", // Center the button
//               transition: "background 0.3s", // Smooth transition for hover effect
//             }}
//             onMouseEnter={(e) => (
//               (e.currentTarget.style.background = "#ff866a"),
//               (e.currentTarget.style.color = "#fff"),
//               (e.currentTarget.style.border = "2px solid #fff")
//             )} // Lighter color on hover
//             onMouseLeave={(e) => (
//               (e.currentTarget.style.background = "#ffff"),
//               (e.currentTarget.style.color = "#ff866a"),
//               (e.currentTarget.style.border = "2px solid #ff866a")
//             )} // Original color
//           >
//             Select Plan
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };


const Card = ({ title, emi, fee, oneTimeFee, total, unsecured }) => {
  const [token, setToken] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { url, getToken } = useContext(AppContext)
  // const calculatedEMI = unsecured
  //   ? parseFloat((unsecured / title).toFixed(2)) // If unsecured, calculate based on unsecured value and title
  //   : parseFloat(emi.replace(/[₹,]/g, "")) || 0; // If not, clean EMI of ₹ symbol and commas



  const calculatedEMI = paymentStatus && paymentStatus.Outstanding 
  ? parseFloat((paymentStatus.Outstanding  / title).toFixed(2)) // Use EMI_Payments from paymentStatus
  : parseFloat(emi.replace(/[₹,]/g, "")) || 0; // Fallback to the EMI string if paymentStatus is null


  

  const subscription = (calculatedEMI * 0.2).toFixed(2); // Calculate 20% of EMI

  // Convert all relevant values to numbers and compute total
  const totalbil =
    calculatedEMI + parseFloat(subscription) + parseFloat(oneTimeFee || 0); // Calculate total by adding EMI, subscription, and one-time fee

  localStorage.setItem("calculatedEMI", calculatedEMI);
  localStorage.setItem("subscription", subscription);
  localStorage.setItem("totalbil", totalbil);

  // Function to update payment information in Zoho CRM
  const updateZohoCRM = async () => {
    ;
    const recordId = localStorage.getItem("recordId"); // Retrieve the record ID from localStorage
    const token = await getToken(); // Assuming you have a function to get the OAuth token

    if (!recordId) {
      console.error("No record ID found.");
      return; // Early exit if recordId is not available
    }

    const payload = [
      {
        Plan_Type: `${title} Months`,
        Monthly_EMI_Payment: calculatedEMI.toString(), // Ensure it's a string
        Total_Plan_Amount: totalbil.toString(), // Ensure it's a string
        Subscription_Fees: subscription.toString(), // Ensure it's a string
        Step: "3", // As per your requirement
      },
    ]

    try {
      const response = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Zoho-oauthtoken ${token}`,
            },
        }
    );

      if (!response.ok) throw new Error("Failed to update Zoho CRM");

      console.log("Payment information updated in Zoho CRM successfully");
    } catch (error) {
      console.error("Error updating Zoho CRM:", error);
    }
  };


  const fetchPaymentStatusFromZoho = async (token) => {
    const recordId = localStorage.getItem("recordId");
    if (!recordId) {
      console.error("No record ID found.");
      return null; // Return null if no record ID is found
    }
  
    try {
      const response = await fetch(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok)
        throw new Error("Failed to fetch payment status from Zoho");
  
      const data = await response.json();
      return data; // Return the data received from Zoho
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return null; // Return null in case of an error
    }
  };
  useEffect(() => {
    const getTokenAndFetchStatus = async () => {
      const token = await getToken(); // Fetch the token
      setToken(token); // Set the token state
  
      const status = await fetchPaymentStatusFromZoho(token); // Fetch payment status
      if (status) {
        setPaymentStatus(status.data[0]); // Update payment status in state
      }
    };
  
    getTokenAndFetchStatus(); // Call the async function
  }, []);  

  return (
    <div
      className="card shadow-sm"
      style={{
        background: "linear-gradient(to right, #ff866a, #ff4865)",
        height: "380px",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <div
        className="card-body text-white d-flex flex-column align-items-center"
        style={{ padding: "1rem" }}
      >
        <h5
          className="card-title text-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {title} Months Plan
        </h5>
        <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
        >
          <span>Monthly EMI:</span>
          <strong>₹{Math.round(calculatedEMI)}</strong>
        </div>
        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
        >
          <span>Subscription:</span>
          <strong>₹{Math.round(subscription)}</strong>
        </div>
        {oneTimeFee && (
          <div
            className="w-100 d-flex justify-content-between"
            style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
          >
            <span>One Time Fee:</span>
            <strong>₹{oneTimeFee}</strong>
          </div>
        )}

        <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0.5rem 0" }}
        >
          <span>Total:</span>
          <strong>₹{Math.round(totalbil)}</strong>
        </div>
        <Link
          to="/offer"
          state={{ title, emi, fee, oneTimeFee, total, calculatedEMI }}
          style={{ textDecoration: "none" }}
        >
        <button
          style={{
            background: "#ffff", // Example background color
            color: "#ff4865",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bolder",
            cursor: "pointer",
            display: "block",
            margin: "20px auto", // Center the button
            transition: "background 0.3s", // Smooth transition for hover effect
          }}
          onClick={() => {
            updateZohoCRM(); // Call the function to update Zoho
          }}
          onMouseEnter={(e) => (
            (e.currentTarget.style.background = "#ff866a"),
            (e.currentTarget.style.color = "#fff"),
            (e.currentTarget.style.border = "2px solid #fff")
          )} // Lighter color on hover
          onMouseLeave={(e) => (
            (e.currentTarget.style.background = "#ffff"),
            (e.currentTarget.style.color = "#ff4865"),
            (e.currentTarget.style.border = "2px solid #ff866a")
          )} // Original color
        >
          Select Plan
        </button>
        </Link>
      </div>
    </div>
  );
};




const CardCarousel = ({ unsecured }) => {
  const cards = [
    {
      title: 12,
      emi: "₹41,667",
      fee: "₹8,333",
      oneTimeFee: 599,
      total: "₹50,599",
      unsecured: unsecured,
    },
    {
      title: 24,
      emi: "₹20,833",
      fee: "₹4,167",
      oneTimeFee: 599,
      total: "₹25,599",
      unsecured: unsecured,
    },
    {
      title: 36,
      emi: "₹13,889",
      fee: "₹2,778",
      oneTimeFee: 599,
      total: "₹17,266",
      unsecured: unsecured,
    },
    {
      title: 48,
      emi: "₹10,417",
      fee: "₹2,083",
      oneTimeFee: 599,
      total: null,
      unsecured: unsecured,
    },
  ];

  return (
 <div
  id="cardCarousel"
  className="carousel slide"
  data-bs-ride="carousel"
  style={{ margin: "2rem 0" }}
>
  <div className="carousel-inner">
    <h1
      style={{
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "bolder",
        color: "red",
        textTransform: "capitalize",
      }}
    >
      Select Your Affordable Plan Below
    </h1>

    {/* Group cards in pairs for desktop, and show individual cards for mobile */}
    {cards.map((card, index) => (
      <div
        className={`carousel-item ${index === 0 ? "active" : ""}`}
        key={index}
      >
        <div className="row g-2">
          {/* For mobile view: Show one card per slide */}
          <div className="col-12 d-flex justify-content-center d-md-none">
            <Card {...card} />
          </div>

          {/* For larger screens: Show two cards per slide */}
          <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
            <Card {...card} />
          </div>
          {/* Show the next card in the same slide for desktop */}
          {cards[index + 1] && (
            <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
              <Card {...cards[index + 1]} />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Carousel indicators */}
  <div className="carousel-indicators" style={{bottom: '-24px'}}>
    {cards.map((_, index) => (
      <button
        key={index}
        type="button"
        data-bs-target="#cardCarousel"
        style={{ backgroundColor: "#ff4865", border: "2px solid white" }}
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-current={index === 0 ? "true" : "false"}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ))}
  </div>
</div>

  
  );
};

export default CardCarousel;
