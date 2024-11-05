import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { FaEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const { url, user } = useContext(AppContext);
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
  const [tickets, setTickets] = useState([]);
  const [loading, setloading] = useState(true);
  //
  const generateTicketToken = async () => {
    try {
      const res = await axios.get(`${url}/ticket`);
      if (res.status === 200) {
        sessionStorage.setItem(
          "sdTicket",
          JSON.stringify(res.data.access_token)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTickets = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("sdTicket"));
      if (!token) {
        await generateTicketToken();
        await getTickets();
      } else {
        const res = await axios.get(
          `${url}/proxy?url=https://desk.zoho.in/api/v1/tickets/search?limit=100&email=${user.Email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        const data = await res.data.data;
        data.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === null) {
              obj[key] = "";
            }
          }
        });
        data.forEach((item) => {
          if (item.createdTime !== null || item.createdTime !== "-") {
            let date = item.createdTime
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            let time = item.createdTime.split("T")[1].split(".")[0];
            item.createdTime = `${date} at ${time}`;
          }
        });
        data.forEach((item) => {
          if (item.status === "Closed" || item.status === "closed") {
            let date = item.closedTime
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            let time = item.closedTime.split("T")[1].split(".")[0];
            item.closedTime = `${date} at ${time}`;
          }
        });
        setTickets(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getTickets();
  }, []);
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState(null);
  const openModal = (item) => {
    setDetails({
      ticket: item.ticketNumber,
      subject: item.subject,
      department: item.department.name,
      status: item.status,
      created: item.createdTime,
      closed: item.closedTime,
    });
    setModalVisible(true);
  };
  const closeModal = () => {
    setDetails(null);
    setModalVisible(false);
  };
  return (
    <>
        <AppBar />
      <div className="journal container p-2">
        <div className="py-4">
          <h2 className="text-center">Tickets</h2>
          {loading ? (
            <Loading />
          ) : tickets.length !== 0 ? (
            <>
              <div className="table-responsive mt-4">
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="gradient-bg">Sr</th>
                      <th className="gradient-bg">Ticket number</th>
                      <th className="gradient-bg">Subject</th>
                      <th className="gradient-bg">Department</th>
                      <th className="gradient-bg">Status</th>
                      <th className="gradient-bg">Created time</th>
                      <th className="gradient-bg">Closed time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((item, index) => {
                      if (
                        item.department.name ===
                          "Customer service department" ||
                        item.department.name === "Legal Team"
                      )
                        return (
                          <tr
                            key={index}
                            style={{
                              borderLeft: `5px solid ${
                                item.status === "Open" || item.status === "open"
                                  ? "danger"
                                  : "success"
                              }`,
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>
                              <span>#{item.ticketNumber}</span>
                            </td>
                            <td>
                              <span className="table-clamp">
                                {item.subject}
                              </span>
                            </td>
                            <td>
                              <span className="table-clamp">
                                {item.department.name}
                              </span>
                            </td>
                            <td>
                              <span className="table-clamp">{item.status}</span>
                            </td>
                            <td>
                              <span className="table-clamp">
                                {item.createdTime}
                              </span>
                            </td>
                            <td>
                              <span className="table-clamp">
                                {item.closedTime}
                              </span>
                            </td>
                            <td>
                              <button
                                className="button"
                                onClick={() => openModal(item)}
                              >
                                <FaEye />
                              </button>
                            </td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-center my-4">No data found</p>
          )}
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
          <div className="body p-2">
            {details !== null ? (
              <>
                <p>
                  Ticket Number :{" "}
                  <span className="fw-bold">#{details.ticket}</span>
                </p>
                <p>
                  Subject : <span className="fw-bold">{details.subject}</span>
                </p>
                <p>
                  Department :{" "}
                  <span className="fw-bold">{details.department}</span>
                </p>
                <p>
                  Status : <span className="fw-bold">{details.status}</span>
                </p>
                <p>
                  Created Time :{" "}
                  <span className="fw-bold">{details.created}</span>
                </p>
                <p>
                  Closed Time :{" "}
                  <span className="fw-bold">{details.closed}</span>
                </p>
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

export default Ticket;
