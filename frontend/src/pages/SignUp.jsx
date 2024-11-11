import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import whitelogo from "../assets/images/white logo.png";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import googleStore from "../assets/images/Google-Store.webp";
import appStore from "../assets/images/App-Store.webp";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const { url, getToken } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!inputs.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(inputs.name.trim())) {
      newErrors.name = "Name must be a valid string (letters and spaces only)";
    }

    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!inputs.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(inputs.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      createUser(); // Only call createUser if inputs are valid
    }
  };

  const createUser = async () => {
    if (!inputs.mobile || !inputs.email || !inputs.name) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        setMessage("Authentication failed, unable to get token.");
        setLoading(false);
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
      localStorage.setItem("crUser", JSON.stringify(inputs.mobile));
      const userData = res.data?.data?.[0];

      if (userData) {
        const createdId = userData.id;
        localStorage.setItem("recordId", createdId);
        setMessage("User already exists. Please Login");

        toast.info("User data found for the provided mobile number! Do Login", {
          onClose: () => {
            setTimeout(() => {
              navigate("/login");
            }, 25000);
          },
        });

        setLoading(false);
      } else {
        // Creating a new user in Zoho CRM
        const [firstName, ...lastNameParts] = inputs.name.split(" ");
        const lastName = lastNameParts.join(" ");

        const data = [
          {
            Phone_Number: inputs.mobile,
            Email: inputs.email,
            Full_Name: inputs.name,
            Last_Name: lastName || firstName,
            Account_Status: "Enrolled",
          },
        ];

        const createUserRes = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        console.log(createUserRes);

        if (createUserRes.data.data[0].code === "SUCCESS") {
          let countdown = 60;
          setMessage(
            `User created successfully. Please wait, processing your information... 1:00`
          );

          // Start the countdown timer
          const startCountdown = () => {
            const countdownInterval = setInterval(() => {
              countdown -= 1;
              const minutes = Math.floor(countdown / 60);
              const seconds = countdown % 60;
        
              // Update the message with the formatted countdown
              setMessage(
                `User created successfully. Please wait, processing your information... ${minutes}:${seconds
                  .toString()
                  .padStart(2, "0")}`
              );
        
              // Check if countdown reached zero
              if (countdown <= 0) {
                clearInterval(countdownInterval); // Stop the timer
                setMessage("Almost done... Please wait a bit longer.");
        
                // Reset countdown and start it again
                countdown = 60;
                startCountdown(); // Start the timer again
              }
            }, 1000);
          };

          startCountdown();

          const intervalId = setInterval(async () => {
            const checkRes = await axios.get(
              `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=(Phone_Number:equals:${inputs.mobile})`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Zoho-oauthtoken ${token}`,
                },
              }
            );

            const newUserData = checkRes.data?.data?.[0];
            if (newUserData) {
              clearInterval(intervalId); // Stop checking
              setLoading(false); // Stop loader
              navigate("/registrationfflow"); // Navigate to the next page
            }
          }, 10000); // Check every second
        } else {
          setMessage("Failed to create user in Zoho CRM.");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("An error occurred while creating user.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-part">
        <div className="inner-part">
          <Link to="/" className="logo">
            <img src={whitelogo} alt="logo" loading="lazy" />
          </Link>
          <div>
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
          <h2>Sign Up</h2>
          <p>Please Sign Up to your account</p>
          <div className="login-form my-5">
            <form onSubmit={handleSubmit}>
              <div className="form-control" style={{ border: "none" }}>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full Name"
                    autoComplete="off"
                    value={inputs.name}
                    onChange={handleInputs}
                  />
                  <label htmlFor="name" className="form-label input-label">
                    Full Name
                  </label>
                  {errors.name && (
                    <span className="error-message text-danger">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email"
                    autoComplete="off"
                    value={inputs.email}
                    onChange={handleInputs}
                  />
                  <label htmlFor="email" className="form-label input-label">
                    Email
                  </label>
                  {errors.email && (
                    <span className="error-message text-danger">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="Mobile No"
                    autoComplete="off"
                    value={inputs.mobile}
                    onChange={handleInputs}
                  />
                  <label htmlFor="mobile" className="form-label input-label">
                    Mobile No
                  </label>
                  {errors.mobile && (
                    <span className="error-message text-danger">
                      {errors.mobile}
                    </span>
                  )}
                </div>
              </div>

              {/* <button type="submit">Submit</button> */}
            </form>
            {message && <p className="text-success">{message}</p>}
            <button
              className="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{ justifyContent: loading ? "center" : "space-between" }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  Sign Up
                  <FaArrowRight />
                </>
              )}
            </button>
            <p class="text-dark pt-2">
              Already a Customer?
              <Link
                to="/login"
                class="fw-bold fs-6 text-danger text-decoration-none ms-2 me-2"
              >
                Login Here
              </Link>
            </p>
          </div>
          <div className="d-flex">
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
  );
};

export default SignUp;
