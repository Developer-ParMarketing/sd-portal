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

  // Validate mobile number format
  const validateMobile = () => {
    const mobileRegex = /^[0-9]{10}$/; // Basic 10-digit mobile number validation
    if (!inputs.mobile) {
      setMessage("Please enter your mobile number.");
      return false;
    }
    if (!mobileRegex.test(inputs.mobile)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const generateOTP = async () => {
    if (!validateMobile()) return; // Mobile validation before generating OTP

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
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!inputs.otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      const otpRes = await axios.get(
        `https://msg.mtalkz.com/V2/http-verifysms-api.php?apikey=ZwNEGnllw1d6psrt&sessionid=${inputs.details}&otp=${inputs.otp}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (otpRes.data.Status === "Success") {
        const token = await getToken();
        if (!token) {
          setMessage("Authentication failed. Unable to get token.");
          return;
        }

        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=(Phone_Number:equals:${inputs.mobile})`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );

        const userData = res.data?.data?.[0];
        console.log(userData);

        if (userData) {
          const recordId = userData.id;
          localStorage.setItem("recordId", recordId);
          handleLogin(userData, inputs.mobile);
        } else {
          setMessage(
            "No user data found for the provided mobile number. Please sign up."
          );
          toast.error(
            "No user data found for the provided mobile number! Please sign up.",
            {
              onClose: () => {
                setTimeout(() => {
                  navigate("/signup");
                }, 300);
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

  const fetchPaymentStatusFromZoho = async (token) => {
    const recordId = localStorage.getItem("recordId");
    if (!recordId) {
      console.error("No record ID found.");
      return null;
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
      return data;
    } catch (error) {
      console.error("Error fetching payment status:", error);
      return null;
    }
  };

  useEffect(() => {
    const getTokenAndFetchStatus = async () => {
      const token = await getToken();
      setToken(token);

      const status = await fetchPaymentStatusFromZoho(token);
      if (status) {
        setPaymentStatus(status.data[0]);
        setStep(status.data[0].step);
      }
    };

    getTokenAndFetchStatus();
  }, []);

  const handleLogin = async (userData, mobile) => {
    const token = await getToken();
    const status = await fetchPaymentStatusFromZoho(token);

    if (!userData) {
      console.error("No user data found.");
      navigate("/signup");
      return;
    }

    if (userData?.Account_Status === "Inactive") {
      console.error("Account is inactive. Access denied.");
      setMessage("Your account is inactive. Please contact support.");
      navigate("/login");
      return;
    } else if (
      userData?.Account_Status === "Active" &&
      userData?.Phone_Number === mobile
    ) {
      navigate("/"); // Redirect to home page
    } else if (
      userData?.Account_Status === null ||
      userData?.Account_Status === undefined ||
      userData?.Account_Status === ""
    ) {
      const data = [
        {
          Account_Status: "Enrolled",
        },
      ];

      const recordId = localStorage.getItem("recordId");
      const response = await axios.put(`${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`, data, {
        headers : {
          "Content-Type": "application/json",
          Authorization: `Zoho-oauthtoken ${token}`,
        }
      })
      navigate("/registrationfflow");
      // console.log(response);

      // navigate("/registrationfflow");
    } else if (userData?.Account_Status === "Enrolled") {
      const status = await fetchPaymentStatusFromZoho(token);
      if (status && status.data && status.data.length > 0) {
        const paymentStep = status.data[0].Step;
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
      }
    }
  };
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
                <Link to="/terms-conditionpage">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
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
              {message && <p className="text-success">{message}</p>}
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
              <p class="text-dark pt-2">
                Not a Customer Yet?
                <Link
                  to="/signup"
                  className="fw-bold fs-6 text-danger text-decoration-none ms-2 me-2"
                >
                  Sign Up Here
                </Link>
              </p>
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
