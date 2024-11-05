import React, { useContext } from "react";
import "../assets/css/registraionflow.css";
import { FaFileAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Usernavbar from "../components/Usernavbar";
import Shweta from "../assets/images/Advocate.jpg";
import Hishweta from "../components/Hishweta";
import LottieAnimation from "../assets/LottieAnimation";
import { AppContext } from "../context/AppContext";
import imageone from '../assets/images/1.png'
import imagetwo from '../assets/images/2.png'
import imagethree from '../assets/images/3.png'

const RegistrationFlow = () => {
  const { url, getToken, user } = useContext(AppContext);
  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
        {/* {console.log(user.Enroll_Payment_Status)} */}
        {user?.Enroll_Payment_Status === "Paid" ? (
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
           zIndex:'-1px'
         }}
         className="maindiv my-5"
       >
         <h2 style={{ color: "#28a745", fontSize: "28px", fontWeight: "bold" }}>
           🎉 Payment Successful!
         </h2>
         <p style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}>
           Your payment has been completed successfully. You’re one step closer to financial freedom!
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
             onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
             onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
           >
             Go to Hold Page
           </button>
         </Link>
       </div>
       
        ) : (
          <>
            <div className="maindiv1">
              {[
                {
                  step: 1,
                  // icon:  <LottieAnimation />,
                  icon: imageone,
                  title: "Share Your Debts and Type of Harassment",
                  description:
                    "Provide us with information about the type of harassment and your current debts. This helps us understand your situation and tailor the best legal and debt solution that fits your needs.",
                },
                {
                  step: 2,
                  icon: imagethree,
                  title: "Outline your Income and Expenses",
                  description:
                    "Tell us about your income and monthly expenditures. This will allow us to assess your financial landscape and identify the best options for you.",
                },
                {
                  step: 3,
                  icon: imagetwo,
                  title: "Harassment and Debt Solutions",
                  description:
                    "Based on the information you provide, we will present personalized solutions to stop harassments and debt designed to help you regain control and achieve financial stability.",
                },
              ].map(({ step, icon, title, description }) => (
                <div className="card">
                  <div
                    className="count"
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "26px",
                    }}
                  >
                    {step}
                  </div>
                  <div className="stepcard">
                    <div className="header">
                      <div className="icon">
                        <img src={icon} alt="" style={{width:'80px'}} />
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {title}
                      </div>
                    </div>
                    <div className="py-3">{description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="footer-text">
                Our solutions are tailored to help you become debt-free while
                improving your credit score, enabling you to qualify for new
                loans after successfully completing the debt management program
                (DMP).{" "}
              </p>
            </div>
            <Link
              to="/proceed"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button className="procBtn">Proceed</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default RegistrationFlow;
