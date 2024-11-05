import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import {
  FaFaceGrinHearts,
  FaFaceGrin,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceAngry,
  FaRegStar,
  FaStar,
  FaFaceKissBeam,
  FaFaceSadTear,
} from "react-icons/fa6";
import brouchre from "../assets/data/SingleDebt brouchre.pdf";
import AppBar from "../components/AppBar";

const AccountManager = () => {
  const { url, user, getToken } = useContext(AppContext);

  
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not active
    if (user?.Account_Status !== "Active") {
      // console.log("User is not authorized to view this page.");
      navigate("/registrationfflow"); // Redirect to registration flow if not active
    } else if (user?.paymentStatus === "paid") {
      // If user has paid, redirect to the Hold page and prevent further navigation
      navigate("/hold");
    }
  }, [user, navigate]);


  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setSuccess(false);
    setModalVisible(false);
    setRating(1);
  };
  //
  const [rating, setRating] = useState(1);
  const iconsArray = [
    { icon: <FaFaceAngry style={{ color: "red" }} /> },
    { icon: <FaFaceFrown style={{ color: "orange" }} /> },
    { icon: <FaFaceMeh style={{ color: "gold" }} /> },
    { icon: <FaFaceGrin style={{ color: "yellowgreen" }} /> },
    { icon: <FaFaceGrinHearts style={{ color: "green" }} /> },
  ];
  const starsArray = new Array(5).fill(null);
  const selectrating = (index) => {
    setRating(index + 1);
  };
  //
  const [comment, setComment] = useState("");
  //
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const submitRating = async () => {
    if (!comment) {
      setMessage("Please enter your comment");
    } else {
      try {
        const token = await getToken();
        const data = [
          {
            Lead_Name: user.id,
            Ratings: rating,
            Review_Comment: comment,
            Rating_From: "SD portal",
          },
        ];
        const res = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Ratings`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res.status === 201) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setModalVisible(false);
            setRating(1);
          }, 3000);
        } else if (res.status === 401) {
          setMessage("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message]);
  const accountManagerName = user?.Account_Manager?.name || 'Default Name'; // Provide a default name if null


  return (
    <>
        <AppBar />
      <div className="container p-2">
        <div className="text-center mt-4">
          <h2>Account manager</h2>
        </div>

        {/*  */}
        <div className="bottom-border">
          <div>
            <div>
              <h3 className="mb-3">Your account manager</h3>
              <p className="mb-2">
                Your account manager is{" "}
                <span className="fw-bold">{accountManagerName}</span>,
                who will be your one point of contact, if you have any queries,
                you can call or chat with him.
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-start gap-2 mb-4">
              <a href="tel:02268762652" className="white-button">
                call
              </a>
              <a
                href={`https://wa.me/9136585495`}
                target="_blank"
                className="white-button"
              >
                chat
              </a>
              <button className="white-button" onClick={() => openModal()}>
                Rate us
              </button>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="bottom-border">
          <h3 className="mb-3">PDP management</h3>
          <ul className="list-unstyled">
            <li>
              Your account manager will be your one point of contact with
              regards to your PDP management and any queries that you have.
            </li>
          </ul>
        </div>

        {/*  */}

        <div className="bottom-border">
          <h3 className="mb-3">Legal matters, creditors call or visits</h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              With regards to any legal matters, creditors call or visit, you
              will initially need to contact your account manager who will
              direct you to our advocates and para legal, who will deal with any
              of these matters thereafter.
            </li>
            <li>
              If you have any queries you might find the answer in our FAQ and
              our service brochure, please check these out first.
            </li>
          </ul>
        </div>

        {/*  */}

        <div className="py-3">
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/termsconditions">Terms & conditions</Link>
            </li>
            <li className="mb-2">
              <Link to="/">Privacy policy</Link>
            </li>
            <li className="mb-2">
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <a href={brouchre} download="SingleDebt brouchre">
                SingleDebt service brochure
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* modal */}
      <div className={`custom-modal-container ${modalVisible ? "active" : ""}`}>
        <div className="custom-modal-background" onClick={closeModal}></div>
        <div className="custom-modal-box">
          <div className="header p-2">
            <p className="fw-bold text-capitalize">Rate us!</p>
            <div style={{ cursor: "pointer" }} onClick={closeModal}>
              <FaTimes />
            </div>
          </div>
          <div className="body p-2 text-center">
            {!success ? (
              <>
                <p>Please rate your account manager</p>
                <div className="smile-div my-2">
                  {iconsArray[rating - 1].icon}
                </div>
                <div className="star-div">
                  {starsArray.map((_, index) => (
                    <span key={index} onClick={() => selectrating(index)}>
                      {index < rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
                <textarea
                  className="form-control"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </>
            ) : (
              <div className="smile-div my-2">
                {rating >= 4 ? (
                  <>
                    <FaFaceKissBeam style={{ color: "green" }} />
                    <p>
                      Thank you! We're thrilled you had a great experience and
                      look forward to serving you again.
                    </p>
                  </>
                ) : (
                  <>
                    <FaFaceSadTear style={{ color: "red" }} />
                    <p>
                      We're sorry your experience didn't expectations. We'll
                      work to improve.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="footer p-2">
            <p className="text-danger">{message && message}</p>
            <div className="d-flex  align-items-center justify-content-end gap-2">
              <button className="white-button" onClick={closeModal}>
                Close
              </button>
              <button className="button" onClick={submitRating}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountManager;
