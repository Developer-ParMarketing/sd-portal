
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import colorLogo from "../assets/images/color logo.png";
import {
  FaHome,
  FaJournalWhills,
  FaPowerOff,
  FaTicketAlt,
} from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AppBar = () => {
  const { url, user, getToken } = useContext(AppContext);
  
  const [modalVisible, setModalVisible] = useState(false);
  const openLogoutModal = () => {
    setModalVisible(true);
    setRefModal(false);
    setError(false);
    setMessage("");
  };
  const closeLogoutModal = () => {
    setModalVisible(false);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("sdUser");
    navigate("/login", { replace: true });
  };

  const [refModal, setRefModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const openRefModal = () => {
    setModalVisible(true);
    setRefModal(true);
  };
  const closeRefModal = () => {
    setInputs({
      name: "",
      mobile: "",
    });
    setModalVisible(false);
  };
  const postReference = async () => {
    if (!inputs.name || !inputs.mobile) {
      setError(true);
      setMessage("Enter complete details");
    } else {
      try {
        setLoading(true);
        const token = await getToken();
        const data = [
          {
            Refer_Name: inputs.name,
            Phone_Number: inputs.name,
            Lead_Name: user.id,
          },
        ];
        const res = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/SD_Portal`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res.status === 201) {
          setError(false);
          setMessage("Message sent.");
          setTimeout(() => {
            setModalVisible(false);
            setInputs({
              name: "",
              mobile: "",
            });
            setMessage("");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-white p-2 sticky-top d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={colorLogo} alt="logo" loading="lazy" />
          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <Link to="/help" className="button">
            Help & Support
          </Link>
          <button className="button" onClick={openLogoutModal}>
            <FaPowerOff />
          </button>
        </div>
      </div>
      <div className="container p-2">
        <div
          className="notice-board p-2 mt-2"
          onClick={openRefModal}
          style={{ cursor: "pointer" }}
        >
         <marquee behavior="" direction="left">
            <p className="text-white">
              <span className="fw-bold">Refer and earn INR 1,000! Recommend SingleDebt </span>
              <span className="me-2">
              to someone being harassed or struggling with their debts and get
              </span>
              <span className="fw-bold">
                INR 1,000 when they enrol with us. Click here.
              </span>
            </p>
          </marquee>
        </div>

        <div className="mt-4">
          <h2 className="text-md-center">
            Welcome back {user?.Full_Name || "Guest"}
          </h2>
          <p className="text-capitalize fw-bold">
            Account manager: {user?.Account_Manager?.name || "N/A"}
          </p>
          <p className="text-capitalize fw-bold">
            Unique reference number:{" "}
            <span className="text-uppercase">
              {user?.Lead_Unique_ID || "N/A"}
            </span>
          </p>
        </div>

        <ul className="tab mt-4 list-unstyled">
          <li className="active">
            <NavLink to="/" className="white-button">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/todo" className="white-button">
              <CgNotes />
              <span>To-Do list</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/journal" className="white-button">
              <FaJournalWhills />
              Journal
            </NavLink>
          </li>
          <li>
            <a
              href={user?.Lead_Activity_Details || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="white-button"
            >
              <FaJournalWhills />
              Activity logs
            </a>
          </li>
          <li>
            <NavLink to="/ticket" className="white-button">
              <FaTicketAlt />
              Tickets
            </NavLink>
          </li>
        </ul>
      </div>

      {/* modal */}
      <div className={`custom-modal-container ${modalVisible ? "active" : ""}`}>
        <div
          className="custom-modal-background"
          onClick={() => setModalVisible(false)}
        ></div>
        <div className="custom-modal-box">
          {refModal ? (
            <div className="header p-2">
              <p className="fw-bold text-capitalize">
                Refer a friend or family
              </p>
            </div>
          ) : (
            ""
          )}
          <div
            className={`body py-4 p-2 ${refModal ? "" : "text-center rounded"}`}
          >
            {refModal ? (
              <>
                <div className="mb-4">
                  <label>Name of friend or family</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label>Mobile number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mobile"
                    value={inputs.mobile}
                    onChange={handleInputs}
                    autoComplete="off"
                  />
                </div>
              </>
            ) : (
              <>
                <h2>Logout?</h2>
                <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                  <button className="button" onClick={logout}>
                    Yes
                  </button>
                  <button className="button" onClick={closeLogoutModal}>
                    No
                  </button>
                </div>
              </>
            )}
          </div>
          {refModal ? (
            <div className="footer p-2">
              <p
                className={`${
                  error ? "text-danger" : "text-success"
                } text-end mb-2`}
              >
                {message}
              </p>
              <div className="d-flex  align-items-center justify-content-end gap-2">
                {loading ? (
                  ""
                ) : (
                  <button className="white-button" onClick={closeRefModal}>
                    Close
                  </button>
                )}
                <button className="button" onClick={postReference}>
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default AppBar;
