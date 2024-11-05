import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const AdvocateLawyer = () => {
  const { url, user, getToken } = useContext(AppContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not active
    if (user?.Account_Status !== "Active") {
      console.log("User is not authorized to view this page.");
      navigate("/registrationfflow"); // Redirect to registration flow if not active
    } else if (user?.paymentStatus === "paid") {
      // If user has paid, redirect to the Hold page and prevent further navigation
      navigate("/hold");
    }
  }, [user, navigate]);
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInputs, setModalInputs] = useState({
    title: "",
    body: "",
  });
  const handleModalInputs = (e) => {
    const { name, value } = e.target;
    setModalInputs({
      ...modalInputs,
      [name]: value,
    });
  };
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  //
  const openModal = (title) => {
    setModalInputs({
      ...modalInputs,
      title,
    });
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalInputs({
      title: "",
      body: "",
    });
    setModalVisible(false);
  };
  //
  const [loading, setLoading] = useState(false);
  const postMessage = async () => {
    if (!modalInputs.body) {
      setError(true);
      setMessage("Enter your message");
    } else {
      try {
        setLoading(true);
        const token = await getToken();
        const data = [
          {
            Title: modalInputs.title,
            Client_Comments: modalInputs.body,
            Lead_Name: user.id,
            Added_By: user.Full_Name,
            Department: "Legal",
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
          setMessage("Message sent");
          setTimeout(() => {
            setModalVisible(false);
            setModalInputs({
              title: "",
              body: "",
            });
            setMessage("");
          }, 3000);
        } else {
          setError(true);
          setMessage("Something went wrong");
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
        <AppBar />
      <div className="journal container p-2">
        <div className="text-center my-4">
          <h2>Advocates & Lawyers</h2>
          <p>
            You must tell us about any legal action that your creditor take when
            they happen
          </p>
        </div>

        {/*  */}
        <div className="change-type first-change-type">
          <div>
            <p className="fw-bold">harassment</p>
            <ul className="ms-3">
              <li>
                If you have evidence of creditor's harassment ie Call and video
                recordings
              </li>
              <li>Reply from creditors for harassment complaints</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Harassment")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Legal notice</p>
            <ul className="ms-3">
              <li>Copies of legal notices received</li>
              <li>Respond to our reply of legal notice</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Legal Notice")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Arbitration</p>
            <ul className="ms-3">
              <li>Copies of arbitration notice</li>
              <li>Respond to our reply to the arbitration notice</li>
              <li>Notice of arbitration hearing</li>
              <li>Copies of arbitration Orders</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Arbitration")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Bounced cheque</p>
            <ul className="ms-3">
              <li>Bounced cheque legal notice</li>
              <li>Bail</li>
              <li>Court hearings</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Bounced Cheque")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Other Legal Services</p>
            <ul className="ms-3">
              <li>Other legal matters</li>
              <li>Ombudsman reply</li>
              <li>Compensation awards</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Other Legal Services")}
            >
              Submit
            </button>
          </div>
        </div>
        {/*  */}

        <div
          className="rounded border d-flex align-items-lg-center align-items-stretch justify-content-between flex-lg-row flex-column gap-2 my-4 p-md-4 p-2"
          style={{ background: "#eee" }}
        >
          <p>
            *For any legal files like notice, legal letters and harassment files
            to be uploaded or legal journal entries needs to be done via the{" "}
            <span className="fw-bold">"Legal matters"</span> page.
          </p>

          <div className="d-flex align-items-center justify-content-end gap-2">
            <a href={`tel:02268762604`} className="white-button">
              call
            </a>
            <a
              href={`https://wa.me/7304615246`}
              target="_blank"
              className="white-button"
            >
              chat
            </a>
          </div>
        </div>
      </div>

      {/* modal */}
      <div className={`custom-modal-container ${modalVisible ? "active" : ""}`}>
        <div className="custom-modal-background" onClick={closeModal}></div>
        <div className="custom-modal-box">
          <div className="header p-2">
            <p className="fw-bold text-capitalize">{modalInputs.title}</p>
            <div style={{ cursor: "pointer" }} onClick={closeModal}>
              <FaTimes />
            </div>
          </div>
          <div className="body p-2">
            <textarea
              className="form-control mb-4"
              value={modalInputs.body}
              name="body"
              onChange={handleModalInputs}
            ></textarea>
            <p>
              *If you wish to submit any evidence files, kindly send them via
              email to{" "}
              <a href="mailto:advocate@singledebt.in" className="fw-bold">
                advocate@singledebt.in
              </a>
            </p>
          </div>
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
                <button className="white-button" onClick={closeModal}>
                  Close
                </button>
              )}
              <button className="button" onClick={postMessage}>
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
        </div>
      </div>
    </>
  );
};

export default AdvocateLawyer;
