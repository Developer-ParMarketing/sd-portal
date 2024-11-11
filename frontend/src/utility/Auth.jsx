// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to check the current path
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import Loading from "../components/Loading";

// const Auth = ({ Component }) => {
//   const { url, user, setUser, getToken } = useContext(AppContext);
//   const navigate = useNavigate();
//   const location = useLocation(); // Hook to get the current route
//   const [error, setError] = useState(null);
//   const [errorStatus, setErrorStatus] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [token, setToken] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [step, setStep] = useState(null);
//   const [account_Status, setAccount_Status] = useState(null);

//   const authenticate = async () => {
//     const sdUser = JSON.parse(localStorage.getItem("sdUser"));

//     // Restrict access to the homepage ("/") if payment is not completed
//     if (!sdUser) {
//       // If user is not logged in, redirect to login
//       navigate("/login", { replace: true });
//       return;
//     }
//     // console.log(user?.Account_Status);
    
//     if (user?.Account_Status === "Inactive") {
//       // If user is not logged in, redirect to login
//       navigate("/login", { replace: true });
//       return;
//     }

//     // Fetch token and payment status
//     let token = await getToken();
//     if (!token) {
//       const createToken = await axios.get(`${url}/token/generate`);
//       token = createToken.data.token[0].token;
//     }

//     const status = await fetchPaymentStatusFromZoho(token); // Fetch payment status
//     if (status && status.data.length > 0) {
//       setPaymentStatus(status.data[0].Enroll_Payment_Status); // Update payment status
//       setStep(status.data[0].Step);
//       setAccount_Status(status.data[0].Step);
//     } else {
//       console.error("No valid payment status found in response.");
//       setPaymentStatus(null);
//     }

//     try {
//       const res = await axios.get(
//         `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Phone_Number:equals:${sdUser}))`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Zoho-oauthtoken ${token}`,
//           },
//         }
//       );

//       if (res.status === 200) {
//         const details = res.data.data[0];
//         setUser(details);
//         setLoading(false); // Stop loading once user data is set
//       } else {
//         handleErrorResponse(res);
//       }
//     } catch (error) {
//       console.error(error);
//       setError("Token expired. Please try again after sometime.");
//       setLoading(false); // Stop loading on error
//     }
//   };

//   const handleErrorResponse = (res) => {
//     if (res.status === 401) {
//       setError("Token expired. Please try again after sometime.");
//     } else if (res.status === 204) {
//       setError("Account not found");
//       setErrorStatus(true);
//     }
//     setLoading(false);
//   };
//   // console.log(user?user.Account_Status:'');


  
  

//   useEffect(() => {
//     authenticate();
//     // const protectedPages = ['/userdetails','/reportchange','/advocatelawyer','/paralegal','/makepayment','/accountmanager','/documents']; // Add more pages as needed

//     // if (protectedPages.includes(location.pathname) && 
//     //     user && 
//     //     (user.Account_Status === "Inactive" || user.Account_Status === "Enrolled")) {
//     //   console.log('User needs to login. Redirecting...');
//     //   navigate('/login');
      
//     // }
//   }, [location.pathname]); // Make sure to re-run this logic on route change

//   // Fetch payment status from Zoho
//   const fetchPaymentStatusFromZoho = async (token) => {
//     const recordId = localStorage.getItem("recordId");
//     // console.log("this is ", paymentStatus?.toLowerCase() !== "paid");
//     // console.log("this is ", step);

//     if (!recordId) {
//       console.error("No record ID found.");
//       return null; // Return null if no record ID is found
//     }

//     try {
//       const response = await fetch(
//         `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Zoho-oauthtoken ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok)
//         throw new Error("Failed to fetch payment status from Zoho");

//       const data = await response.json();
//       return data; // Return the data received from Zoho
//     } catch (error) {
//       console.error("Error fetching payment status:", error);
//       return null; // Return null in case of an error
//     }
//   };

//   const differentAccount = () => {
//     localStorage.removeItem("sdUser");
//     localStorage.removeItem("paymentStatus");
//     navigate("/login", { replace: true });
//   };

//   if (loading) {
//     return <Loading />; // Show loading indicator while authenticating
//   }

//   if (error) {
//     return (
//       <div className="d-flex flex-column align-items-center justify-content-between gap-2 py-4">
//         <p>{error}</p>
//         {errorStatus && (
//           <button className="button" onClick={differentAccount}>
//             Login with different account{" "}
//             {/* {console.log(
//               "this is other data",
//               paymentStatus?.Enroll_Payment_Status
//             )} */}
//           </button>
//         )}
//       </div>
//     );
//   }

//   return user ? <Component /> : <Loading />;
// };

// export default Auth;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to check the current path
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const Auth = ({ Component }) => {
  const { url, user, setUser, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [token, setToken] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [step, setStep] = useState(null);
  const [account_Status, setAccount_Status] = useState(null);

  const authenticate = async () => {
    const sdUser = JSON.parse(localStorage.getItem("sdUser"));
    const crUser = JSON.parse(localStorage.getItem("crUser"));

    // Restrict access to the homepage ("/") if payment is not completed
    if (!(sdUser || crUser)) {
      // If user is not logged in, redirect to login
      navigate("/login", { replace: true });
      return;
    }
    // console.log(user?.Account_Status);
    
    if (user?.Account_Status === "Inactive") {
      // If user is not logged in, redirect to login
      navigate("/login", { replace: true });
      return;
    }

    // Fetch token and payment status
    let token = await getToken();
    if (!token) {
      const createToken = await axios.get(`${url}/token/generate`);
      token = createToken.data.token[0].token;
    }

    const status = await fetchPaymentStatusFromZoho(token); // Fetch payment status
    if (status && status.data.length > 0) {
      setPaymentStatus(status.data[0].Enroll_Payment_Status); // Update payment status
      setStep(status.data[0].Step);
      setAccount_Status(status.data[0].Step);
    } else {
      console.error("No valid payment status found in response.");
      setPaymentStatus(null);
    }

    try {
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Phone_Number:equals:${sdUser || crUser}))`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
console.log(res.data.data[0].id);


// 532383000160110350
// 532383000160110350

      if (res.status === 200) {
        const details = res.data.data[0];
        setUser(details);
        setLoading(false); // Stop loading once user data is set
      } else {
        handleErrorResponse(res);
      }
    } catch (error) {
      console.error(error);
      setError("Token expired. Please try again after sometime.");
      setLoading(false); // Stop loading on error
      navigate('/login')
    }
  };

  const handleErrorResponse = (res) => {
    if (res.status === 401) {
      setError("Token expired. Please try again after sometime.");
    } else if (res.status === 204) {
      setError("Account not found");
      setErrorStatus(true);
    }
    setLoading(false);
  };
  // console.log(user?user.Account_Status:'');


  
  

  useEffect(() => {
    authenticate();
    // const protectedPages = ['/userdetails','/reportchange','/advocatelawyer','/paralegal','/makepayment','/accountmanager','/documents']; // Add more pages as needed

    // if (protectedPages.includes(location.pathname) && 
    //     user && 
    //     (user.Account_Status === "Inactive" || user.Account_Status === "Enrolled")) {
    //   console.log('User needs to login. Redirecting...');
    //   navigate('/login');
      
    // }
  }, [location.pathname]); // Make sure to re-run this logic on route change

  // Fetch payment status from Zoho
  const fetchPaymentStatusFromZoho = async (token) => {
    const recordId = localStorage.getItem("recordId");
    // console.log("this is ", paymentStatus?.toLowerCase() !== "paid");
    // console.log("this is ", step);

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

  const differentAccount = () => {
    localStorage.removeItem("sdUser");
    localStorage.removeItem("paymentStatus");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Loading />; // Show loading indicator while authenticating
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-between gap-2 py-4">
        <p>{error}</p>
        {errorStatus && (
          <button className="button" onClick={differentAccount}>
            Login with different account{" "}
            {/* {console.log(
              "this is other data",
              paymentStatus?.Enroll_Payment_Status
            )} */}
          </button>
        )}
      </div>
    );
  }

  return user ? <Component /> : <Loading />;
};

export default Auth;
