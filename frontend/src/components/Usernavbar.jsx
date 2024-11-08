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
const Usernavbar = () => {
    const { url, user, getToken } = useContext(AppContext);
  //
  const [modalVisible, setModalVisible] = useState(false);
  const openLogoutModal = () => {
    localStorage.removeItem("rzp_checkout_anon_id");
    localStorage.removeItem("rzp_device_id");
    localStorage.removeItem("sdUser");
    localStorage.removeItem("recordId");
    localStorage.removeItem("calculatedEMI");
    localStorage.removeItem("subscription");
    localStorage.removeItem("totalbil");
    setModalVisible(true);
    setRefModal(false);
    setError(false);
    setMessage("");
    navigate("/login"); 
  };
  const closeLogoutModal = () => {
    setModalVisible(false);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("sdUser");
    navigate("/login", { replace: true });
  };
  //
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

       

       
      </div>
    </>
  );
};

export default Usernavbar;
