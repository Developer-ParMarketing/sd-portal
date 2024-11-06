// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import whitelogo from "../assets/images/white logo.png";
// import { FaArrowRight } from "react-icons/fa";
// import axios from "axios";
// import googleStore from "../assets/images/Google-Store.webp";
// import appStore from "../assets/images/App-Store.webp";
// import { AppContext } from "../context/AppContext";

// const SignUp = () => {
//   const { url, user, getToken } = useContext(AppContext);
//   const [generated, setGenerated] = useState(false);
//   //
//   const [inputs, setInputs] = useState({
//     mobile: "",
//     otp: "",
//     details: "",
//   });
//   const handleInputs = (e) => {
//     const { name, value } = e.target;
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   };
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   //
//   const navigate = useNavigate();

//   const handleLogin = (userData, mobile) => {
//     // Here you can handle the login logic, such as setting user data in context or local storage.
//     console.log("User logged in:", userData, mobile);
//     // For example, you can store user info in localStorage:
//     localStorage.setItem("userData", JSON.stringify(userData));
//     // You can also set user context or do any additional logic as needed.
//   };

//   const generateOTP = async () => {
//     if (!inputs.mobile) {
//       setMessage("Enter your mobile number");
//     } else {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `https://msg.mtalkz.com/V2/http-api-sms.php?apikey=ZwNEGnllw1d6psrt&senderid=SGLDBT&number=${inputs.mobile}&message=Your%20secret%20One%20Time%20Password%20(OTP)%20is%20{OTP}.%20Keep%20it%20confidential%20for%20security%20reasons%2C%20and%20don%27t%20share%20it%20with%20anyone.%20SingleDebt&format=json`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (res.data.Status === "Success") {
//           setGenerated(true);
//           setInputs({
//             ...inputs,
//             details: res.data.Details,
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
//   //
//   const verifyOTP = async () => {
//     if (!inputs.otp) {
//       setMessage("Enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const otpRes = await axios.get(
//         `https://msg.mtalkz.com/V2/http-verifysms-api.php?apikey=ZwNEGnllw1d6psrt&sessionid=${inputs.details}&otp=${inputs.otp}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (otpRes.data.Status === "Success") {
//         // Fetch the Zoho CRM API token
//         const token = await getToken();
//         if (!token) {
//           setMessage("Authentication failed, unable to get token.");
//           return;
//         }

//         // Search for the lead by mobile number
//         const res = await axios.get(
//           `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=(Phone_Number:equals:${inputs.mobile})`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Zoho-oauthtoken ${token}`,
//             },
//           }
//         );

//         const userData = res.data?.data?.[0]; // Ensure we get the first record from Zoho
//         if (userData) {
//           const recordId = userData.id;
//           console.log(recordId);

//           localStorage.setItem("recordId", recordId); // Store recordId in localStorage
//           handleLogin(userData, inputs.mobile); // Log the user in with their data
//         } else {
//           // Create a new user if they don't exist
//           const newUser = {
//             data: [
//               {
//                 Phone_Number: inputs.mobile,
//                 // Add additional fields as necessary
//               },
//             ],
//           };

//           const createUserRes = await axios.post(
//             `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads`,
//             newUser,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Zoho-oauthtoken ${token}`,
//               },
//             }
//           );

//           if (createUserRes.data.data[0].code === "SUCCESS") {
//             const createdRecordId = createUserRes.data.data[0].details.id;
//             console.log(createdRecordId);
//             localStorage.setItem("recordId", createdRecordId); // Store new recordId in localStorage
//             handleLogin(newUser.data[0], inputs.mobile); // Log the new user in
//           } else {
//             setMessage("Failed to create user in Zoho CRM.");
//           }
//         }
//       } else {
//         setMessage("OTP verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP or fetching user data:", error);
//       setMessage("An error occurred while verifying OTP or fetching user data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //
//   useEffect(() => {
//     if (message !== "") {
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//     }
//   }, [message]);
//   return (
//     <>
//       <div className="login-page">
//         <div className="left-part">
//           <div className="inner-part">
//             <Link to="/" className="logo">
//               <img src={whitelogo} alt="logo" loading="lazy" />
//             </Link>

//             <div>
//               <h2>Welcome to SingleDebt Portal</h2>
//               <p>
//                 Where your financial journey begins towards a debt-free future
//               </p>
//             </div>

//             <ul className="d-flex align-items-lg-center align-items-start justify-content-start flex-lg-row flex-column terms-list">
//               <li>
//                 <Link to="/termsconditions">Term & Conditions</Link>
//               </li>
//               <li>
//                 <a href="https://singledebt.in/privacy-policy" target="_blank">
//                   Privacy policy
//                 </a>
//               </li>
//               <li>
//                 <Link to="/faq">FAQ</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="right-part">
//           <div className="inner-part">
//             <div>
//               <h2>Sign Up</h2>
//               <p>Please Sign Up to your account</p>
//             </div>
//             <div className="login-form my-5">
//               <div className="mb-3">
//                 <div className="form-control" style={{ border: "none" }}>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-input"
//                       placeholder="Name"
//                       required
//                       autoComplete="off"

//                       value={inputs.name}

//                     />
//                     <label htmlFor="mobile" className="form-label input-label">
//                       Name
//                     </label>
//                   </div>

//                   <div className="input-group">
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-input"
//                       placeholder="email"
//                       required
//                       autoComplete="off"

//                       value={inputs.email}

//                     />
//                     <label
//                       htmlFor="email"
//                       className="form-label input-label"
//                     >
//                       Email
//                     </label>
//                   </div>

//                   <div className="input-group">
//                     <input
//                       type="tel"
//                       name="alternativeMobile"
//                       className="form-input"
//                       placeholder=" "
//                       required
//                       autoComplete="off"
//                       disabled={generated}
//                       value={inputs.alternativeMobile}
//                       onChange={handleInputs}
//                     />
//                     <label
//                       htmlFor="alternativeMobile"
//                       className="form-label input-label"
//                     >
//                        Mobile No
//                     </label>
//                   </div>
//                 </div>

//                 {generated === true ? (
//                   <p
//                     className="text-end mt-1 fw-bold"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setGenerated(false)}
//                   >
//                     Wrong mobile number?
//                   </p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//               {generated === true ? (
//                 <div className="form-control mb-3" style={{ border: "none" }}>
//                   <input
//                     type="number"
//                     name="otp"
//                     className="form-input"
//                     placeholder="OTP"
//                     required
//                     autoComplete="off"
//                     value={inputs.otp}
//                     onChange={handleInputs}
//                   />
//                   <label htmlFor="otp" className="form-label input-label">
//                     OTP
//                   </label>
//                 </div>
//               ) : (
//                 ""
//               )}
//               {message && <p className="text-danger">{message}</p>}
//               <button
//                 className="button"
//                 style={{ justifyContent: loading ? "center" : "space-between" }}
//                 onClick={generated === false ? generateOTP : verifyOTP}
//               >
//                 {loading ? (
//                   <div
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 ) : (
//                   <>
//                     {generated === false ? "Generate OTP" : "Login"}
//                     <FaArrowRight />
//                   </>
//                 )}
//               </button>
//               {generated === true ? (
//                 <p
//                   className="text-end mt-1 fw-bold"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => setGenerated(false)}
//                 >
//                   Regerate OTP
//                 </p>
//               ) : (
//                 ""
//               )}
//             </div>

//             <div className="d-flex align-items-sm-center align-items-start justify-content-start gap-2 flex-sm-row flex-column">
//               <a
//                 href="https://play.google.com/store/apps/details?id=com.singledebt&hl=en_IN"
//                 target="_blank"
//                 className="store-image"
//               >
//                 <img src={googleStore} className="invert-image" alt="" />
//               </a>
//               <a
//                 href="https://apps.apple.com/in/app/singledebt/id6480590793"
//                 target="_blank"
//                 className="store-image"
//               >
//                 <img src={appStore} className="invert-image" alt="" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
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

      const userData = res.data?.data?.[0];

      if (userData) {
        setMessage("User already exists. Please Login");

        toast.info(
          "User data found for the provided mobile number! Do Login",
          {
            onClose: () => {
              // This function will be called after the toast is closed
              setTimeout(() => {
                navigate("/login"); // Redirect to the signup page after 3 seconds (or whatever duration you want)
              }, 25000); // Adjust the timeout duration as needed (3000 ms = 3 seconds)
            },
          }
        );

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

        if (createUserRes.data.data[0].code === "SUCCESS") {
          setMessage(
            "User created successfully. Please wait, processing your information..."
          );

          // Check for userData every second
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
          }, 1000); // Check every second
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
              <Link to="/termsconditions">Term & Conditions</Link>
            </li>
            <li>
              <a
                href="https://singledebt.in/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
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
          <h2>Sign Up</h2>
          <p>Please Sign Up to your account</p>
          <div className="login-form my-5">
            <div className="mb-3">
              <div className="form-control" style={{ border: "none" }}>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full Name"
                    required
                    autoComplete="off"
                    value={inputs.name}
                    onChange={handleInputs}
                  />
                  <label htmlFor="name" className="form-label input-label">
                    Full Name
                  </label>
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email"
                    required
                    autoComplete="off"
                    value={inputs.email}
                    onChange={handleInputs}
                  />
                  <label htmlFor="email" className="form-label input-label">
                    Email
                  </label>
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="Mobile No"
                    required
                    autoComplete="off"
                    value={inputs.mobile}
                    onChange={handleInputs}
                  />
                  <label htmlFor="mobile" className="form-label input-label">
                    Mobile No
                  </label>
                </div>
              </div>
            </div>
            {message && <p className="text-success">{message}</p>}
            <button className="button" onClick={createUser} disabled={loading}>
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
  );
};

export default SignUp;
