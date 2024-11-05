import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import whitelogo from "../assets/images/white logo.png";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import googleStore from "../assets/images/Google-Store.webp";
import appStore from "../assets/images/App-Store.webp";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { url, user, getToken } = useContext(AppContext);
  const [generated, setGenerated] = useState(false);
  const [step, setStep] = useState(null);

  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
    otp: "",
    details: "", // session details for OTP
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const generateOTP = async () => {
    if (!inputs.mobile) {
      setMessage("Enter your mobile number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://msg.mtalkz.com/V2/http-api-sms.php?apikey=ZwNEGnllw1d6psrt&senderid=SGLDBT&number=${inputs.mobile}&message=Your%20secret%20One%20Time%20Password%20(OTP)%20is%20{OTP}.%20Keep%20it%20confidential%20for%20security%20reasons%2C%20and%20don%27t%20share%20it%20with%20anyone.%20SingleDebt&format=json`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.Status === "Success") {
        localStorage.setItem("sdUser", JSON.stringify(inputs.mobile));
        setGenerated(true);
        setInputs({
          ...inputs,
          details: res.data.Details,
        });
        setMessage("OTP sent successfully");
      } else {
        setMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!inputs.otp) {
      setMessage("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      // Verify OTP via mtalkz
      const otpRes = await axios.get(
        `https://msg.mtalkz.com/V2/http-verifysms-api.php?apikey=ZwNEGnllw1d6psrt&sessionid=${inputs.details}&otp=${inputs.otp}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (otpRes.data.Status === "Success") {
        // Fetch the Zoho CRM API token
        const token = await getToken();
        if (!token) {
          setMessage("Authentication failed, unable to get token.");
          return;
        }

        // Search for the lead by mobile number
        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=(Phone_Number:equals:${inputs.mobile})`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );

        const userData = res.data?.data?.[0]; // Ensure we get the first record from Zoho
        if (userData) {
          const recordId = userData.id;
          // console.log(recordId);

          localStorage.setItem("recordId", recordId); // Store recordId in localStorage

          handleLogin(userData, inputs.mobile); // Log the user in with their data
        } else {
          setMessage(
            "No user data found for the provided mobile number !.Do Sign Up"
          );
          toast.error(
            "No user data found for the provided mobile number! Do Sign Up",
            {
              onClose: () => {
                // This function will be called after the toast is closed
                setTimeout(() => {
                  navigate("/signup"); // Redirect to the signup page after 3 seconds (or whatever duration you want)
                }, 300); // Adjust the timeout duration as needed (3000 ms = 3 seconds)
              },
            }
          );
        }
      } else {
        setMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP or fetching user data:", error);
      setMessage(
        "An error occurred while verifying OTP or fetching user data."
      );
    } finally {
      setLoading(false);
    }
  };

  // otp  setGenerated(true);

  // const generateOTP = async () => {
  //   if (!inputs.mobile) {
  //     setMessage("Enter your mobile number");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // Default OTP for testing
  //     const defaultOtp = "1234";
  //     console.log(`Sending OTP ${defaultOtp} to ${inputs.mobile}`);

  //     // Simulate storing the OTP details for testing
  //     localStorage.setItem("sdUser", JSON.stringify(inputs.mobile));
  //     setInputs((prev) => ({
  //       ...prev,
  //       details: defaultOtp, // Store the default OTP in inputs.details for testing
  //     }));
  //     setMessage("OTP sent successfully. (Default: 1234)"); // Notify user
  //     setGenerated(true);
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error sending OTP");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const verifyOTP = async () => {
  //   if (!inputs.otp) {
  //     setMessage("Enter OTP");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // Check the OTP against the default OTP
  //     const defaultOtp = "1234";
  //     if (inputs.otp === defaultOtp) {
  //       console.log("Simulated OTP verification success.");
  //       setGenerated(true)
  //       // Fetch the Zoho CRM API token
  //       const token = await getToken();
  //       if (!token) {
  //         setMessage("Authentication failed, unable to get token.");
  //         return;
  //       }

  //       // Search for the lead by mobile number
  //       const res = await axios.get(
  //         `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=(Phone_Number:equals:${inputs.mobile})`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Zoho-oauthtoken ${token}`,
  //           },
  //         }
  //       );

  //       const userData = res.data?.data?.[0];
  //       if (userData) {
  //         const recordId = userData.id;
  //         console.log(recordId);

  //         localStorage.setItem("recordId", recordId);

  //         handleLogin(userData, inputs.mobile);

  //         // Redirect to the desired page after login
  //         navigate('/');
  //       } else {
  //         setMessage("No user data found for the provided mobile number.");
  //       }
  //     } else {
  //       setMessage("OTP verification failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP or fetching user data:", error);
  //     setMessage("An error occurred while verifying OTP or fetching user data.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // otp

  // get data
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
        setStep(status.data[0].step); // Update payment status in state
      }
    };

    getTokenAndFetchStatus(); // Call the async function
  }, []);

  // workin
  const handleLogin = async (userData, mobile) => {
    // console.log("This is login", userData);
    // console.log("This is mobile", mobile);

    // Fetch token and payment status before navigating
    const token = await getToken(); // Fetch the token
    const status = await fetchPaymentStatusFromZoho(token); // Fetch payment status

    // console.log("User Data:", userData); // Log user data
    // console.log("Payment Status:", status); // Log the entire payment status

    // Check if userData is valid
    if (!userData) {
      console.error("No user data found.");
      navigate("/signup");
      return;
    }

    // Check account status and mobile number
    // if (
    //   userData?.Account_Status === "Active" &&
    //   userData?.Phone_Number === mobile
    // ) {
    //   console.log("Navigating to home page");
    //   navigate("/"); // Redirect to home page
    // } else if (userData?.Account_Status === "Enrolled") {
    //   console.log("Account is enrolled, navigating based on steps");

    if (userData?.Account_Status === "Inactive") {
      console.error("Account is inactive. Access denied.");
      setMessage("Your account is inactive. Please contact support."); // Display an error message
      // Optionally, redirect to a different page, e.g., a support page or login page
      navigate("/login"); // Redirect to support or another appropriate page
      return; // Prevent further actions
    } else if (
      userData?.Account_Status === "Active" &&
      userData?.Phone_Number === mobile
    ) {
      // console.log("Navigating to home page");
      navigate("/"); // Redirect to home page
    } else if (userData?.Account_Status === "Enrolled") {
      // console.log("Account is enrolled, navigating based on steps");
      // Proceed with your logic for enrolled users
      // Ensure payment status is available before navigating
      const status = await fetchPaymentStatusFromZoho(token); // Fetch payment status

      // Log the current account status
      // console.log("Account is enrolled status:", userData.Account_Status);

      // Ensure payment status is available
      if (status && status.data && status.data.length > 0) {
        const paymentStep = status.data[0].Step; // Get the Step from paymentStatus
        // console.log("Payment Step:", paymentStep); // Log the payment step

        // Navigate based on payment step
        switch (paymentStep) {
          case 4:
            navigate("/hold");
            break;
          case 3:
            navigate("/offer");
            break;
          case 2:
            navigate("/description");
            break;
          default:
            navigate("/registrationfflow");
            break;
        }
      } else {
        // Default action if payment status is not available
        // console.log(
        //   "No payment status available, navigating to registration flow"
        // );
        navigate("/registrationfflow");
      }
    } else if (userData?.Account_Status === "Inactive") {
      // console.log("Account is inactive");
      setMessage("Your account is inactive. Please contact support.");
    } else {
      // console.log("Redirecting to signup page");
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <div className="login-page">
        <div className="left-part">
          <div className="inner-part">
            <Link to="/" className="logo">
              <img src={whitelogo} alt="logo" loading="lazy" />
            </Link>
            <div>
              {step}
              <h2>Welcome to SingleDebt Portal</h2>
              <p>
                Where your financial journey begins towards a debt-free future
              </p>
            </div>
            <ul className="d-flex align-items-lg-center align-items-start justify-content-start flex-lg-row flex-column terms-list">
              <li>
                <Link to="/termsconditions">Term & Conditions</Link>
              </li>
              <li>
                <a href="https://singledebt.in/privacy-policy" target="_blank" rel="noreferrer">
                  Privacy policy
                </a>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-part">
          <div className="inner-part">
            <div>
              <h2>Login</h2>
              <p>Please login to your account</p>
            </div>
            <div className="login-form my-5">
              <div className="mb-3">
                <div className="form-control" style={{ border: "none" }}>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="Mobile"
                    required
                    autoComplete="off"
                    disabled={generated}
                    value={inputs.mobile}
                    onChange={handleInputs}
                  />
                  <label htmlFor="mobile" className="form-label input-label">
                    Mobile
                  </label>
                </div>
                {generated && (
                  <p
                    className="text-end mt-1 fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => setGenerated(false)}
                  >
                    Wrong mobile number?
                  </p>
                )}
              </div>
              {generated && (
                <div className="form-control mb-3" style={{ border: "none" }}>
                  <input
                    type="number"
                    name="otp"
                    className="form-input"
                    placeholder="OTP"
                    required
                    autoComplete="off"
                    value={inputs.otp}
                    onChange={handleInputs}
                  />
                  <label htmlFor="otp" className="form-label input-label">
                    OTP
                  </label>
                </div>
              )}
              {message && <p className="text-danger">{message}</p>}
              <button
                className="button"
                style={{ justifyContent: loading ? "center" : "space-between" }}
                onClick={generated ? verifyOTP : generateOTP}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {generated ? "Login" : "Generate OTP"}
                    <FaArrowRight />
                  </>
                )}
              </button>
              {generated && (
                <p
                  className="text-end mt-1 fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setGenerated(false)}
                >
                  Regenerate OTP
                </p>
              )}
            </div>

            <div className="d-flex align-items-sm-center align-items-start justify-content-start gap-2 flex-sm-row flex-column">
              <a
                href="https://play.google.com/store/apps/details?id=com.singledebt&hl=en_IN"
                target="_blank"
                className="store-image"
                rel="noreferrer"
              >
                <img src={googleStore} className="invert-image" alt="" />
              </a>
              <a
                href="https://apps.apple.com/in/app/singledebt/id6480590793"
                target="_blank"
                className="store-image"
                rel="noreferrer"
              >
                <img src={appStore} className="invert-image" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
