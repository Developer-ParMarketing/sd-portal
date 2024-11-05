import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLink, FaTimes } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "../components/AppBar";

const MakePayment = () => {
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
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [paymentDue, setPaymentDue] = useState("");
  const fetchPayment = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Invoice_Payment/search?criteria=((Lead_Name:equals:${user.id}))`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      //
      if (res.status === 200) {
        setPaymentDue(res.data.data[0].Due_Date);
        res.data.data.map((item) => {
          if (item.Status === null) {
            item.color = "black";
          } else if (item.Status.toLowerCase() === "paid") {
            item.color = "green";
          } else if (
            item.Status.toLowerCase() === "overdue" ||
            item.Status.toLowerCase() === "void"
          ) {
            item.color = "red";
          } else if (item.Status.toLowerCase() === "sent") {
            item.color = "orange";
          } else if (
            item.Status.toLowerCase() === "draft" ||
            item.Status.toLowerCase() === "partially paid"
          ) {
            item.color = "blue";
          }
        });
        res.data.data.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (item[key] === null) {
              item[key] = "-";
            }
          });
        });
        setPayments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const openModal = (item) => {
    setModalVisible(true);
    setPaymentDetail(item);
  };
  const closeModal = () => {
    setModalVisible(false);
    setPaymentDetail(null);
  };
  return (
    <>
        <AppBar />
      <div className="container p-2">
        <div className="text-center mt-4">
          <h2>Make a payment</h2>
        </div>

        <div className="bottom-border">
          <h3 className="mb-3">Your payments</h3>
          <p className="mb-2">
            Your monthly payments under PDP is{" "}
            <span className="fw-bold">
              <LiaRupeeSignSolid />
              {user !== null
                ? user.Disposable_Income_DI.toLocaleString("en-IN")
                : ""}
            </span>{" "}
            due on{" "}
            <span className="fw-bold">
              {paymentDue.split("-").reverse().join("-")}
            </span>
            .
          </p>
        </div>

        <div className="w-100">
          {loading ? (
            <Loading />
          ) : payments.length === 0 ? (
            <p className="text-center my-4">No data found</p>
          ) : (
            <div className="new-grid my-4">
              {payments.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="new-card"
                    onClick={() => openModal(item)}
                    style={{
                      cursor: "pointer",
                      borderLeft: `5px solid ${item.color}`,
                    }}
                  >
                    <p>
                      <span className="fw-bold">Payment number:</span>{" "}
                      {item.Payment_Number}
                    </p>
                    <p>
                      <span className="fw-bold">Payment date:</span>{" "}
                      {item.Payment_Date !== null
                        ? item.Payment_Date.split("-").reverse().join("-")
                        : "-"}
                    </p>
                    <p>
                      <span className="fw-bold">Grand total:</span>{" "}
                      <LiaRupeeSignSolid />
                      {item.Grand_Total
                        ? item.Grand_Total.toLocaleString("en-IN")
                        : "-"}
                    </p>
                    <p>
                      <span className="fw-bold">creditor amount:</span>{" "}
                      <LiaRupeeSignSolid />
                      {item.Creditors_Amount
                        ? item.Creditors_Amount.toLocaleString("en-IN")
                        : "-"}
                    </p>
                    <p>
                      <span className="fw-bold">Payment status:</span>{" "}
                      <span>{item.Status}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* modal */}
      <div className={`custom-modal-container ${modalVisible ? "active" : ""}`}>
        <div className="custom-modal-background" onClick={closeModal}></div>
        <div className="custom-modal-box">
          <div className="header p-2">
            <p className="fw-bold text-capitalize">Payment details</p>
            <div style={{ cursor: "pointer" }} onClick={closeModal}>
              <FaTimes />
            </div>
          </div>
          <div className="body p-2">
            {paymentDetail !== null ? (
              <>
                <p>
                  <span className="fw-bold">Invoice date:</span>{" "}
                  {paymentDetail.Invoice_Date.split("-").reverse().join("-")}
                </p>
                <p>
                  <span className="fw-bold">Due date:</span>{" "}
                  {paymentDetail.Due_Date.split("-").reverse().join("-")}
                </p>
                <p>
                  <span className="fw-bold">Payment Status:</span>{" "}
                  <span
                    className="text-capitalize fw-bold"
                    style={{ color: `${paymentDetail.color}` }}
                  >
                    {paymentDetail.Status}
                  </span>
                </p>
                <p>
                  <span className="fw-bold">Payment date:</span>{" "}
                  {paymentDetail.Payment_Date.split("-").reverse().join("-")}
                </p>
                <p>
                  <span className="fw-bold">Grand total:</span>{" "}
                  <LiaRupeeSignSolid />
                  {paymentDetail.Grand_Total.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="fw-bold">payment made:</span>{" "}
                  <LiaRupeeSignSolid />
                  {paymentDetail.Payment_Date.split("-").reverse().join("-")}
                </p>
                <p>
                  <span className="fw-bold">balance due:</span>{" "}
                  <LiaRupeeSignSolid />
                  {paymentDetail.Balance_Due.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="fw-bold">creditor amount:</span>{" "}
                  <LiaRupeeSignSolid />
                  {paymentDetail.Creditors_Amount.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="fw-bold">payment mode:</span>{" "}
                  {paymentDetail.Payment_Mode}
                </p>
                <Link
                  to={paymentDetail.URL_1}
                  target="_blank"
                  className="button d-block mt-2"
                  style={{ width: "fit-content" }}
                >
                  Payment link <FaLink />{" "}
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePayment;
