import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user, getToken, fetchPaymentStatusFromZoho } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user) {
        const token = await getToken();
        const paymentStatus = await fetchPaymentStatusFromZoho(token);
        setStatus(paymentStatus);
      }
      setLoading(false);
    };

    checkUserStatus();
  }, [user, getToken, fetchPaymentStatusFromZoho]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!user) {
    return <Navigate to="/signup" />; // Redirect to signup if no user
  }

  if (user.Account_Status === "Inactive") {
    return <Navigate to="/support" />; // Redirect inactive accounts
  }

  // If user is active, allow access to home page
  if (user.Account_Status === "Active") {
    return children; // Render home page or any other protected route
  }

  // If user is enrolled, redirect based on payment step
  if (user.Account_Status === "Enrolled" && status) {
    const paymentStep = status.data[0]?.Step;

    // Navigate based on payment step
    switch (paymentStep) {
      case 4:
        return <Navigate to="/hold" />;
      case 3:
        return <Navigate to="/description" />;
      case 2:
        return <Navigate to="/income-and-expense" />;
      default:
        return <Navigate to="/registrationfflow" />;
    }
  }

  // Default case if no conditions are met
  return <Navigate to="/registrationfflow" />;
};

export default ProtectedRoute;
