// import React, { useContext, useEffect, useRef } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import Usernavbar from "../components/Usernavbar";
// import Hishweta from "../components/Hishweta";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

// const Income = () => {
//   const { url, user, getToken, setUser } = useContext(AppContext);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const formData = location.state;

//   const incomeRef = useRef();
//   const expensesRef = useRef();

//   const mainDivStyle = {
//     backgroundColor: "#ffffff", // White background for contrast
//     padding: "40px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
//     textAlign: "center",
//     maxWidth: "600px",
//     margin: "auto", // Center the main div
//   };

//   const formStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     width: "100%",
//     marginTop: "20px", // Space between heading and form
//   };

//   const inputStyle = {
//     padding: "12px",
//     border: "1px solid black", // Border color for emphasis
//     borderRadius: "8px",
//     fontSize: "16px",
//     outline: "none",
//     transition: "border-color 0.3s",
//     backgroundColor: "#f9f9f9", // Light grey for inputs
//   };

//   const headerStyle = {
//     textAlign: "center",
//     color: "red",
//     fontWeight: "bold",
//   };

//   const buttonStyle = {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontSize: "16px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//     fontWeight: "bold",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Retrieve the values from your refs
//     const totalIncome = incomeRef.current.value;
//     const monthlyExpenses = expensesRef.current.value;

//     // Prepare the form data to be sent to the Zoho API
//     const combinedData = [
//       {
//         Income: totalIncome, // Assuming this corresponds to the total income
//         Expenses: monthlyExpenses,
//         Step: 2, // Make sure to set the correct step for this API call
//       },
//     ];

//     try {
//       const token = await getToken();
//       const recordId = localStorage.getItem("recordId");

//       // console.log(recordId);
//       // console.log(token);

//       // Make the PUT request to update data in Zoho CRM
//       const response = await axios.put(
//         `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${
//           recordId ? recordId : user.id
//         }`,
//         combinedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Zoho-oauthtoken ${token}`,
//           },
//         }
//       );

//       // Check the response for success
//       if (response.data.data[0].code === "SUCCESS") {
//         toast.success("Data updated successfully!");
//         navigate("/description"); // Navigate to the Description page
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//       toast.error("Failed to update data.");
//     }
//   };

//   return (
//     <>
//       <Usernavbar />
//       <div className="container p-2 py-4">
//         <Hishweta
//           heading={"Hi! I'm Shweta"}
//           paragraph={"Your specialist lawyer in harassment and debt matters"}
//         />
//         {user?.Enroll_Payment_Status === "Paid" ? (
//           <div style={mainDivStyle} className="my-5">
//             <h2
//               style={{ color: "#28a745", fontSize: "28px", fontWeight: "bold" }}
//             >
//               🎉 Payment Successful!
//             </h2>
//             <p style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}>
//               Your payment has been completed successfully. You’re one step
//               closer to financial freedom!
//             </p>
//             <Link to="/hold">
//               <button style={buttonStyle} className="procBtn">
//                 Go to Hold Page
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="maindiv" style={mainDivStyle}>
//             <h1 style={headerStyle} className="mt-4">
//               Your Income & Expenses
//             </h1>
//             <form style={formStyle} onSubmit={handleSubmit}>
//               <div style={{ position: "relative", marginBottom: "10px" }}>
//                 <input
//                   type="number"
//                   placeholder="Total Income per month"
//                   style={inputStyle}
//                   ref={incomeRef}
//                   required
// min="1" // This ensures the number cannot be less than 1
// onChange={(e) => {
//   if (e.target.value <= 0) {
//     e.target.value = ""; // Clear the input if value is <= 0
//   }
// }}
//                 />
//                 <span className="tooltip-icon">
//                   <span style={{ fontWeight: "bold" }}> i</span>
//                   <span className="tooltip-text">
//                     Please provide your total income for the month.
//                   </span>
//                 </span>
//               </div>

//               <div style={{ position: "relative", marginBottom: "10px" }}>
//                 <input
//                   type="number"
//                   placeholder="Total monthly expenses for daily needs"
//                   style={inputStyle}
//                   ref={expensesRef}
//                   required
//                   min="1" // This ensures the number cannot be less than 1
//                   onChange={(e) => {
//                     if (e.target.value <= 0) {
//                       e.target.value = ""; // Clear the input if value is <= 0
//                     }
//                   }}
//                 />
//                 <span className="tooltip-icon">
//                   <span style={{ fontWeight: "bold" }}> i</span>
//                   <span className="tooltip-text">
//                     Enter your total monthly expenses.
//                   </span>
//                 </span>
//               </div>

//               <button type="submit" className="procBtn" style={buttonStyle}>
//                 Submit
//               </button>
//               <style jsx>{`
//                 .tooltip-icon {
//                   display: inline-block;
//                   background-color: #ddd;
//                   border-radius: 50%;
//                   width: 20px;
//                   height: 20px;
//                   text-align: center;
//                   font-size: 14px;
//                   cursor: pointer;
//                   position: absolute;
//                   right: -30px; /* Adjust as needed */
//                   top: 10px; /* Center vertically with the input */
//                 }

//                 .tooltip-text {
//                   visibility: hidden;
//                   background-color: #555;
//                   color: #fff;
//                   text-align: center;
//                   padding: 5px;
//                   border-radius: 5px;
//                   position: absolute;
//                   z-index: 1;
//                   bottom: 125%; /* Position above the icon */
//                   // left: 50%;
//                   right: 100%;
//                   margin-left: -60px; /* Center the tooltip */
//                   width: 120px; /* Tooltip width */
//                   opacity: 0;
//                   transition: opacity 0.3s;
//                 }

//                 .tooltip-icon:hover .tooltip-text {
//                   visibility: visible;
//                   opacity: 1;
//                 }

//                 .tooltip-icon:hover {
//                   color: blue; /* Optional: Change color on hover */
//                 }
//                 input {
//                   width: 100%;
//                 }
//                 select {
//                   width: 100%;
//                 }
//               `}</style>
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Income;

import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Income = () => {
  const { url, user, getToken, setUser } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state;

  const incomeRef = useRef();
  const expensesRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataPreview, setFormDataPreview] = useState({
    totalIncome: "",
    monthlyExpenses: "",
  });

  const mainDivStyle = {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    marginTop: "20px",
  };

  const inputStyle = {
    padding: "12px",
    border: "1px solid black",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#f9f9f9",
  };

  const headerStyle = {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const totalIncome = incomeRef.current.value;
    const monthlyExpenses = expensesRef.current.value;

    // Set the form data preview for the modal
    setFormDataPreview({
      totalIncome,
      monthlyExpenses,
    });

    // Open the modal to confirm details
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    // Prepare the form data to be sent to the Zoho API
    const combinedData = [
      {
        Income: formDataPreview.totalIncome,
        Expenses: formDataPreview.monthlyExpenses,
        Step: 2,
      },
    ];

    try {
      const token = await getToken();
      const recordId = localStorage.getItem("recordId");

      const response = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${
          recordId ? recordId : user.id
        }`,
        combinedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );

      if (response.data.data[0].code === "SUCCESS") {
        toast.success("Data updated successfully!");
        navigate("/description");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.");
    }

    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
        {user?.Enroll_Payment_Status === "Paid" ? (
          <div style={mainDivStyle} className="my-5">
            <h2
              style={{ color: "#28a745", fontSize: "28px", fontWeight: "bold" }}
            >
              🎉 Payment Successful!
            </h2>
            <p style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}>
              Your payment has been completed successfully. You’re one step
              closer to financial freedom!
            </p>
            <Link to="/hold">
              <button style={buttonStyle} className="procBtn">
                Go to Hold Page
              </button>
            </Link>
          </div>
        ) : (
          <div className="maindiv" style={mainDivStyle}>
            <h1 style={headerStyle} className="mt-4">
              Your Income & Expenses
            </h1>
            <form style={formStyle} onSubmit={handleSubmit}>
              <div style={{ position: "relative", marginBottom: "10px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "12px",
                    fontSize: "16px",
                    color: "#888",
                  }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Total Income per month"
                  style={{ ...inputStyle, paddingLeft: "25px" }} // Adding padding to accommodate the ₹ symbol
                  ref={incomeRef}
                  required
                  min="1"
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      e.target.value = "";
                    }
                  }}
                />
                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Please provide your total income for the month.
                  </span>
                </span>
              </div>

              <div style={{ position: "relative", marginBottom: "10px" }}>
              <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "12px",
                    fontSize: "16px",
                    color: "#888",
                  }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Total monthly expenses for daily needs"
                  style={{ ...inputStyle, paddingLeft: "25px" }}
                  ref={expensesRef}
                  required
                  min="1"
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      e.target.value = "";
                    }
                  }}
                />
                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Enter your total monthly expenses.
                  </span>
                </span>
              </div>

              <button type="submit" className="procBtn" style={buttonStyle}>
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="modal d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-content p-4 rounded shadow-lg text-start"
              style={{
                maxWidth: "600px",
                width: "90%",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h3 className="text-center mb-4">Confirm Your Details</h3>
              <p className="d-flex justify-content-between">
                <strong>Total Income:</strong>
                <span>₹{formDataPreview.totalIncome}</span>
              </p>
              <p className="d-flex justify-content-between">
                <strong>Monthly Expenses:</strong>
                <span>₹{formDataPreview.monthlyExpenses}</span>
              </p>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-primary w-100 me-2"
                  onClick={handleFinalSubmit}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(to right, #ff866a, #ff4865)",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Confirm
                </button>

                <button
                  className="btn btn-secondary w-100 ms-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .tooltip-icon {
          display: inline-block;
          background-color: #ddd;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          position: absolute;
          right: -30px;
          top: 10px;
        }

        .tooltip-text {
          visibility: hidden;
          background-color: #555;
          color: #fff;
          text-align: center;
          padding: 5px;
          border-radius: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          right: 100%;
          margin-left: -60px;
          width: 120px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tooltip-icon:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        .tooltip-icon:hover {
          color: blue;
        }
        input {
          width: 100%;
        }
        select {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Income;
