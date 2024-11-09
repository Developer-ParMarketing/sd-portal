// import React, { useContext, useRef } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import Usernavbar from "../components/Usernavbar";
// import Hishweta from "../components/Hishweta";
// import { useHistory } from "react-router-dom";

// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

// const Proceed = () => {
//   const { url, user, getToken } = useContext(AppContext);

//   const navigate = useNavigate();
//   const unsecuredCreditorsRef = useRef();
//   const totalDebtsRef = useRef();
//   const totalEMIRef = useRef();
//   const harassmentTypeRef = useRef();
//   const legalActionRef = useRef();

//   // const history = useHistory();

//   const headerStyle = {
//     textAlign: "center",
//     color: "red", // Darker color for better contrast
//     fontWeight: "bold",
//   };

//   const mainDivStyle = {
//     backgroundColor: "#ffffff", // White background for contrast
//     padding: "40px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow
//     textAlign: "center",
//     maxWidth: "600px",
//     margin: "auto", // Center align the main div
//   };

//   const formStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     width: "100%",
//   };

//   const inputStyle = {
//     padding: "12px",
//     border: "1px solid black",
//     borderRadius: "8px",
//     fontSize: "16px",
//     outline: "none",
//     transition: "border-color 0.3s",
//     backgroundColor: "#f9f9f9", // Light grey for inputs
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

//   const buttonHoverStyle = {
//     backgroundColor: "#0056b3", // Darker blue on hover
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = [
//       {
//         No_Of_Loans: unsecuredCreditorsRef.current.value,
//         Outstanding: totalDebtsRef.current.value,
//         EMI_Payments: totalEMIRef.current.value,
//         Harassment_Type: harassmentTypeRef.current.value,
//         Legal_Status: legalActionRef.current.value,
//         Step: 1,
//       },
//     ];

//     try {
//       const token = await getToken();
//       const recordId = localStorage.getItem("recordId");
//       // console.log(recordId);
//       // console.log(token);newUser
//       console.log(user.id);

//       const uid = user.id;
//       const response = await axios.put(
//         `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${
//           recordId ? recordId : uid
//         }`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Zoho-oauthtoken ${token}`,
//           },
//         }
//       );
// console.log(response);

//       if (response.data.data[0].code === "SUCCESS") {
//         toast.success("Data updated successfully!");
//         navigate("/income-and-expense");
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//       toast.error("Failed to update data.");
//     }
//   };

//   const harassmentOptions = [
//     { label: "Select type of harassment" },
//     { label: "Phone Harassment", value: "phone" },
//     { label: "Physical Harassment", value: "physical" },
//     { label: "Emotional Harassment", value: "emotional" },
//     { label: "Repeated Messages", value: "messages" },
//     { label: "Unannounced Visits", value: "visits" },
//     { label: "Other", value: "other" },
//   ];

//   const legalActionOptions = [
//     { label: "Select type of legal action" },
//     { label: "File Complaint", value: "complaint" },
//     { label: "Seek Legal Counsel", value: "counsel" },
//     { label: "Proceed to Court", value: "court" },
//     { label: "Settlement Negotiation", value: "settlement" },
//     { label: "Legal Notices", value: "legal_notices" },
//     { label: "Arbitration", value: "arbitration" },
//     { label: "Bounced Cheques", value: "bounced_cheques" },
//     { label: "Court Hearings", value: "court_hearings" },
//   ];
//   console.log("thisis s", user);

//   return (
//     <>
//       <Usernavbar />
//       <div className="container p-2 py-4 ">
//         <Hishweta
//           heading={"Hi! I'm Shweta"}
//           paragraph={"Your specialist lawyer in harassment and debt matters"}
//         />
//         {user?.Enroll_Payment_Status === "Paid" ? (
//           <>
//             <div
//               style={{
//                 textAlign: "center",
//                 marginTop: "50px", // Increased top margin
//                 padding: "30px",
//                 backgroundColor: "#f9f9f9",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 maxWidth: "500px",
//                 margin: "0 auto", // Center align horizontally
//                 zIndex: "-1px",
//               }}
//               className="maindiv my-5"
//             >
//               <h2
//                 style={{
//                   color: "#28a745",
//                   fontSize: "28px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 🎉 Payment Successful!
//               </h2>
//               <p style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}>
//                 Your payment has been completed successfully. You’re one step
//                 closer to financial freedom!
//               </p>
//               <Link to="/hold">
//                 <button
//                   style={{
//                     padding: "12px 24px",
//                     fontSize: "16px",
//                     color: "#fff",
//                     backgroundColor: "#28a745",
//                     border: "none",
//                     borderRadius: "8px",
//                     cursor: "pointer",
//                     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//                     transition: "background-color 0.3s",
//                   }}
//                   className="procBtn"
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#218838")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#28a745")
//                   }
//                 >
//                   Go to Hold Page
//                 </button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="maindiv " style={mainDivStyle}>
//               <h1 style={headerStyle} className="mt-4">
//                 Your Unsecured Debts & Type of Harassment
//               </h1>
//               <form style={formStyle} onSubmit={handleSubmit}>
//                 <div style={{ position: "relative", marginBottom: "10px" }}>
//                   <input
//                     type="number"
//                     placeholder="Number of unsecured creditors"
//                     style={inputStyle}
//                     ref={unsecuredCreditorsRef}
//                     required
//                     min="1" // This ensures the number cannot be less than 1
//                     onChange={(e) => {
//                       if (e.target.value <= 0) {
//                         e.target.value = ""; // Clear the input if value is <= 0
//                       }
//                     }}
//                   />
//                   <span className="tooltip-icon">
//                     <span style={{ fontWeight: "bold" }}> i</span>
//                     <span className="tooltip-text">
//                       Please provide the total number of credit cards and
//                       personal loans you have.
//                     </span>
//                   </span>
//                 </div>

//                 <div style={{ position: "relative", marginBottom: "10px" }}>
//                   <input
//                     type="number"
//                     placeholder="Total unsecured debts"
//                     style={inputStyle}
//                     ref={totalDebtsRef}
//                     required
//                     min="1" // This ensures the number cannot be less than 1
//                     onChange={(e) => {
//                       if (e.target.value <= 0) {
//                         e.target.value = ""; // Clear the input if value is <= 0
//                       }
//                     }}
//                   />
// <span className="tooltip-icon">
//   <span style={{ fontWeight: "bold" }}> i</span>
//   <span className="tooltip-text">
//     Enter the total amount of debt currently outstanding on
//     all your credit cards and personal loans.
//   </span>
// </span>
//                 </div>

//                 <div style={{ position: "relative", marginBottom: "10px" }}>
//                   <input
//                     type="number"
//                     placeholder="Total EMI for unsecured debts"
//                     style={inputStyle}
//                     ref={totalEMIRef}
//                     required
//                     min="1" // This ensures the number cannot be less than 1
//                     onChange={(e) => {
//                       if (e.target.value <= 0) {
//                         e.target.value = ""; // Clear the input if value is <= 0
//                       }
//                     }}
//                   />
// <span className="tooltip-icon">
//   <span style={{ fontWeight: "bold" }}> i</span>
//   <span className="tooltip-text">
//     The total monthly EMI required for all unsecured debts,
//     including credit cards and personal loans.
//   </span>
// </span>
//                 </div>

//                 <div style={{ position: "relative", marginBottom: "10px" }}>
//                   <select
//                     style={inputStyle}
//                     ref={harassmentTypeRef}
//                     required
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select type of harassment
//                     </option>
//                     {harassmentOptions
//                       .filter((option) => option.value) // Filter out the first placeholder option from the array
//                       .map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                   </select>
// <span className="tooltip-icon">
//   <span style={{ fontWeight: "bold" }}> i</span>
//   <span className="tooltip-text">
//     Describe the type(s) of harassment you are facing from
//     creditors (e.g., repeated phone calls, messages,
//     unannounced visits). Include all relevant forms of
//     harassment.
//   </span>
// </span>
//                 </div>
//                 <div style={{ position: "relative", marginBottom: "10px" }}>
//                   <select
//                     style={inputStyle}
//                     ref={legalActionRef}
//                     required
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select type of legal action
//                     </option>
// {legalActionOptions
//   .filter((option) => option.value) // Filter out the first placeholder option from the array
//   .map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
//                   </select>
// <span className="tooltip-icon">
//   <span style={{ fontWeight: "bold" }}> i</span>
//   <span className="tooltip-text">
//     Provide details of any legal actions taken against you by
//     creditors (e.g., legal notices, arbitration, court
//     hearings, bounced cheques, etc.).
//   </span>
// </span>
//                 </div>
//                 {/*  */}

//                 {/*  */}
//                 <button type="submit" className="procBtn" style={buttonStyle}>
//                   Next
//                 </button>

//                 <style jsx>{`
// .tooltip-icon {
//   display: inline-block;
//   background-color: #ddd;
//   border-radius: 50%;
//   width: 20px;
//   height: 20px;
//   text-align: center;
//   font-size: 14px;
//   cursor: pointer;
//   position: absolute;
//   right: -30px; /* Adjust as needed */
//   top: 10px; /* Center vertically with the input */
// }

// .tooltip-text {
//   visibility: hidden;
//   background-color: #555;
//   color: #fff;
//   text-align: center;
//   padding: 5px;
//   border-radius: 5px;
//   position: absolute;
//   z-index: 1;
//   bottom: 125%; /* Position above the icon */
//   // left: 50%;
//   right: 100%;
//   margin-left: -60px; /* Center the tooltip */
//   width: 120px; /* Tooltip width */
//   opacity: 0;
//   transition: opacity 0.3s;
// }

// .tooltip-icon:hover .tooltip-text {
//   visibility: visible;
//   opacity: 1;
// }

// .tooltip-icon:hover {
//   color: blue; /* Optional: Change color on hover */
// }
// input {
//   width: 100%;
// }
// select {
//   width: 100%;
// }
//                 `}</style>
//               </form>

//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Proceed;

import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Proceed = () => {
  const { url, user, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const unsecuredCreditorsRef = useRef();
  const totalDebtsRef = useRef();
  const totalEMIRef = useRef();
  const harassmentTypeRef = useRef();
  const legalActionRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const headerStyle = {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  };

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
  };

  const inputStyle = {
    padding: "12px",
    border: "1px solid black",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#f9f9f9",
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const harassmentOptions = [
    { label: "Select type of harassment" },
    { label: "Phone Harassment", value: "phone" },
    { label: "Physical Harassment", value: "physical" },
    { label: "Emotional Harassment", value: "emotional" },
    { label: "Repeated Messages", value: "messages" },
    { label: "Unannounced Visits", value: "visits" },
    { label: "Other", value: "other" },
  ];

  const legalActionOptions = [
    { label: "Select type of legal action" },
    { label: "File Complaint", value: "complaint" },
    { label: "Seek Legal Counsel", value: "counsel" },
    { label: "Proceed to Court", value: "court" },
    { label: "Settlement Negotiation", value: "settlement" },
    { label: "Legal Notices", value: "legal_notices" },
    { label: "Arbitration", value: "arbitration" },
    { label: "Bounced Cheques", value: "bounced_cheques" },
    { label: "Court Hearings", value: "court_hearings" },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    // Gather form data and open modal
    setFormData({
      No_Of_Loans: unsecuredCreditorsRef.current.value,
      Outstanding: totalDebtsRef.current.value,
      EMI_Payments: totalEMIRef.current.value,
      Harassment_Type: harassmentTypeRef.current.value,
      Legal_Status: legalActionRef.current.value,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const formattedData = [
      {
        ...formData,
        Step: 1,
      },
    ];

    try {
      const token = await getToken();
      const recordId = localStorage.getItem("recordId");
      const uid = user.id;

      const response = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${
          recordId ? recordId : uid
        }`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );

      if (response.data.data[0].code === "SUCCESS") {
        toast.success("Data updated successfully!");
        navigate("/income-and-expense");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.");
    }
  };

  const handleFinalSubmit = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4 ">
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
              Your Unsecured Debts & Type of Harassment
            </h1>
            <form style={formStyle} onSubmit={handleNext}>
              {/* Form Inputs */}
              <div style={{ position: "relative", marginBottom: "10px" }}>
                
                <input
                  type="number"
                  placeholder="Number of unsecured creditors"
                  style={inputStyle}
                  ref={unsecuredCreditorsRef}
                  required
                  min="1"
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      e.target.value = ""; // Clear the input if value is <= 0
                    }
                  }}
                />

                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Please provide the total number of credit cards and personal
                    loans you have.
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
                  placeholder="Total unsecured debts"
                  style={{ ...inputStyle, paddingLeft: "25px" }}
                  ref={totalDebtsRef}
                  required
                  min="1"
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      e.target.value = ""; // Clear the input if value is <= 0
                    }
                  }}
                  
                />
                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Enter the total amount of debt currently outstanding on all
                    your credit cards and personal loans.
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
                  placeholder="Total EMI for unsecured debts"
                  style={{ ...inputStyle, paddingLeft: "25px" }}
                  ref={totalEMIRef}
                  required
                  min="1"
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      e.target.value = ""; // Clear the input if value is <= 0
                    }
                  }}
                />

                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    The total monthly EMI required for all unsecured debts,
                    including credit cards and personal loans.
                  </span>
                </span>
              </div>

              <div style={{ position: "relative", marginBottom: "10px" }}>
                <select
                  style={inputStyle}
                  ref={harassmentTypeRef}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type of harassment
                  </option>
                  {harassmentOptions
                    .filter((option) => option.value) // Filter out the first placeholder option from the array
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Describe the type(s) of harassment you are facing from
                    creditors (e.g., repeated phone calls, messages, unannounced
                    visits). Include all relevant forms of harassment.
                  </span>
                </span>
              </div>

              <div style={{ position: "relative", marginBottom: "10px" }}>
                <select
                  style={inputStyle}
                  ref={legalActionRef}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type of legal action
                  </option>
                  {legalActionOptions
                    .filter((option) => option.value) // Filter out the first placeholder option from the array
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <span className="tooltip-icon">
                  <span style={{ fontWeight: "bold" }}> i</span>
                  <span className="tooltip-text">
                    Provide details of any legal actions taken against you by
                    creditors (e.g., legal notices, arbitration, court hearings,
                    bounced cheques, etc.).
                  </span>
                </span>
              </div>
              <button type="submit" className="procBtn" style={{ buttonStyle }}>
                Next
              </button>
            </form>

            {/* Modal */}
            {isModalOpen && (
              <div
                className="modal d-flex justify-content-center align-items-center"
                style={{ display: isModalOpen ? "flex" : "none" }}
              >
                <div
                  className="modal-content p-4 rounded shadow-lg text-start"
                  style={{  maxWidth: "600px", width: "90%" }}
                >
                  <h3 className="text-center mb-4">Confirm Your Details</h3>
                  <p className="d-flex justify-content-between">
                    <strong>Number of unsecured creditors:</strong>
                    <span>₹{formData.No_Of_Loans}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>Total unsecured debts:</strong>
                    <span>₹{formData.Outstanding}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>Total EMI for unsecured debts:</strong>
                    <span>₹{formData.EMI_Payments}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>Type of harassment:</strong>
                    <span>{formData.Harassment_Type}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>Type of legal action:</strong>
                    <span>{formData.Legal_Status}</span>
                  </p>
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-primary w-100 me-2"
                      onClick={handleFinalSubmit}
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        background:
                          "linear-gradient(to right, #ff866a, #ff4865)",
                        color: "#fff",
                        fontSize: "16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Conform
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

            {/* Modal CSS */}
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
                right: -30px; /* Adjust as needed */
                top: 10px; /* Center vertically with the input */
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
                bottom: 125%; /* Position above the icon */
                // left: 50%;
                right: 100%;
                margin-left: -60px; /* Center the tooltip */
                width: 120px; /* Tooltip width */
                opacity: 0;
                transition: opacity 0.3s;
              }

              .tooltip-icon:hover .tooltip-text {
                visibility: visible;
                opacity: 1;
              }

              .tooltip-icon:hover {
                color: blue; /* Optional: Change color on hover */
              }
              input {
                width: 100%;
              }
              select {
                width: 100%;
              }

              .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .modal-content {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                width: 300px;
                text-align: center;
              }
              .modal-content button {
                margin: 10px;
                padding: 8px 16px;
                font-size: 16px;
                cursor: pointer;
              }

              //

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
                right: -30px; /* Adjust as needed */
                top: 10px; /* Center vertically with the input */
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
                bottom: 125%; /* Position above the icon */
                // left: 50%;
                right: 100%;
                margin-left: -60px; /* Center the tooltip */
                width: 120px; /* Tooltip width */
                opacity: 0;
                transition: opacity 0.3s;
              }

              .tooltip-icon:hover .tooltip-text {
                visibility: visible;
                opacity: 1;
              }

              .tooltip-icon:hover {
                color: blue; /* Optional: Change color on hover */
              }
              input {
                width: 100%;
              }
              select {
                width: 100%;
              }
            `}</style>
          </div>
        )}
      </div>
    </>
  );
};

export default Proceed;
