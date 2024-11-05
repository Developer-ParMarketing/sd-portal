import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const paymentStatus = localStorage.getItem("paymentStatus");

  return paymentStatus === "completed" ? children : <Navigate to="/payment" />;
};

export default PrivateRoute;
