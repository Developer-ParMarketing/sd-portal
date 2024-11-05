import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const ReportChange = () => {
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
      setLoading(true);
      try {
        const token = await getToken();
        const data = [
          {
            Title: modalInputs.title,
            Client_Comments: modalInputs.body,
            Lead_Name: user.id,
            Added_By: user.Full_Name,
            Department: "CC",
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
      <div className="container p-2">
        <div className="text-center mt-4">
          <h2>Report a change of circumstance</h2>
          <p>
            you must tell us about any legal action that your creditor take when
            they happen
          </p>
        </div>

        <div className="mt-4">
          <h3 className="mb-4">What do you need to tell us about?</h3>

          <div className="change-type first-change-type">
            <div>
              <p className="fw-bold">Work & earnings</p>
              <p>
                Includes employment, self-employment, sick pay, and maternity
                allowence
              </p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("work & earnings")}
              >
                report a change
              </button>
            </div>
          </div>

          <div className="change-type">
            <div>
              <p className="fw-bold">creditor's details</p>
              <p>
                change in any of your creditor's, creditor's NEFT details,
                settlements of any of the debts we are managing
              </p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("creditor's details")}
              >
                report a change
              </button>
            </div>
          </div>

          <div className="change-type">
            <div>
              <p className="fw-bold">Bank details</p>
              <p>Includes bank, NEFT, and account number</p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("bank details")}
              >
                report a change
              </button>
            </div>
          </div>

          <div className="change-type">
            <div>
              <p className="fw-bold">personal details</p>
              <p>Includes name, date of birth, email, and phone number</p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("personal details")}
              >
                report a change
              </button>
            </div>
          </div>

          <div className="change-type">
            <div>
              <p className="fw-bold">Where you live and what it cost</p>
              <p>
                Includes address, rent or home loan (mortgage), and service
                (maintenance) charges
              </p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("residential details")}
              >
                report a change
              </button>
            </div>
          </div>

          <div className="change-type border-bottom-0">
            <div>
              <p className="fw-bold">
                any other changes that would affect the PDP
              </p>
              <p>hospitalised, caring for family, medication cost</p>
            </div>
            <div className="text-lg-end">
              <button
                className="white-button"
                onClick={() => openModal("others")}
              >
                report a change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
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
              className="form-control"
              name="body"
              value={modalInputs.body}
              onChange={handleModalInputs}
            ></textarea>
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

export default ReportChange;
