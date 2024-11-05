import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const ParaLegal = () => {
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
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
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
            Department: "Paralegal",
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
          if (file) {
            const formdata = new FormData();
            formdata.append("file", file);
            const fileRes = await axios.post(
              `${url}/proxy?url=https://www.zohoapis.in/crm/v5/SD_Portal/${res.data.data[0].details.id}/Attachments`,
              formdata,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Zoho-oauthtoken ${token}`,
                },
              }
            );
            console.log(fileRes.data);
          }
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
          <h2>Paralegal - calls & harassments</h2>
          <p>
            You must tell us about any legal action that your creditor take when
            they happen
          </p>
        </div>

        {/*  */}
        <div className="change-type first-change-type">
          <div>
            <p className="fw-bold">call</p>
            <ul className="ms-3">
              <li>Unable to get through to us</li>
              <li>Have recordings of abusive calls</li>
              <li>Other issues with calls</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button className="white-button" onClick={() => openModal("Call")}>
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Visits (Home / Office / Work place)</p>
            <ul className="ms-3">
              <li>Video of creditors harassment</li>
              <li>If creditors are at home or place of work and need help</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Visits")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">call forwarding</p>
            <ul className="ms-3">
              <li>Need help with call forwarding</li>
              <li>Having problems to forward calls</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Call Forwarding")}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="change-type">
          <div>
            <p className="fw-bold">Other Creditor Issues</p>
            <ul className="ms-3">
              <li>Other issues you are experiencing with creditors</li>
            </ul>
          </div>
          <div className="text-lg-end">
            <button
              className="white-button"
              onClick={() => openModal("Other Creditor Issues")}
            >
              Submit
            </button>
          </div>
        </div>
        {/*  */}

        <div
          className="border rounded d-flex align-items-lg-center align-items-stretch justify-content-between flex-lg-row flex-column gap-2 my-4 p-md-4 p-2"
          style={{ background: "#eee" }}
        >
          <p>
            *For any legal files like notice, legal letters and harassment files
            to be uploaded or legal journal entries needs to be done via the{" "}
            <span className="fw-bold">"Legal matters"</span> page.
          </p>

          <div className="d-flex align-items-center justify-content-end gap-2">
            <a href={`tel:02268762652`} className="white-button">
              call
            </a>
            <a
              href={`https://wa.me/9769800274`}
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
            <input
              type="file"
              ref={fileInput}
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control"
            />
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

export default ParaLegal;
