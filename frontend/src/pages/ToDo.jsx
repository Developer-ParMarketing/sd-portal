import React, { useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { FaReply, FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const ToDo = () => {
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
  const [entries, setEntries] = useState([]);
  const [loading, setloading] = useState(true);
  const getToDo = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/SD_Portal/search?criteria=((Lead_Name:equals:${user.id}))`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        res.data.data.forEach((item) => {
          let date = "";
          let time = "";
          date = item.Created_Time.split("T")[0].split("-").reverse().join("-");
          time = item.Created_Time.split("T")[1].split("+")[0];
          item.Created_Time = `${date} at ${time}`;
          //
        });
        const filtered = res.data.data.filter((item) => {
          return item.Client_Comments == null;
        });
        setEntries(filtered);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getToDo();
  }, []);
  //
  const [showReply, setShowReply] = useState(false);
  const [replyID, setReplyID] = useState("");
  //
  useEffect(() => {
    if (replyID !== "") {
      setShowReply(true);
    } else {
      setShowReply(false);
    }
  }, [replyID]);
  const [replyInput, setReplyInput] = useState("");
  const sendReply = () => {};
  return (
    <>
        <AppBar />
      <div className="container p-2 py-4">
        <h2 className="text-center mb-3">ToDo</h2>
        {loading ? (
          <Loading />
        ) : (
          <>
            {entries.length !== 0 ? (
              <>
                {entries.map((item, index) => {
                  return (
                    <div
                      className={`border bg-white rounded p-2 ${
                        index === entries.length - 1 ? "" : "mb-2"
                      }`}
                      key={index}
                    >
                      <p>
                        <span className="fw-bold">Title</span>: {item.Title}
                      </p>
                      <p className="my-2">
                        <span className="fw-bold">Agent message</span>:
                        {item.Agent_Comments}
                      </p>
                      <p>
                        <span className="fw-bold">Date & Time</span>:
                        {item.Created_Time}
                      </p>
                      <div className="row align-items-center justify-content-end m-0">
                        {showReply && replyID === item.id ? (
                          <>
                            <div className="col-md-9">
                              <input
                                type="text"
                                className="form-control"
                                value={replyInput}
                                onChange={(e) => setReplyInput(e.target.value)}
                              />
                            </div>
                            <div className="col-md-2 col-sm-4 col-8 mt-md-0 mt-2">
                              <button
                                className="button d-flex align-items-center justify-content-center w-100"
                                onClick={() => sendReply(item.id)}
                              >
                                <FaReply className="me-2" />
                                Submit
                              </button>
                            </div>
                            <div className="col-md-1 col-2 text-end mt-md-0 mt-2 ps-0">
                              <button
                                className="button"
                                onClick={() => setShowReply(false)}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {!showReply ? (
                          <div className="col-md-2 col-sm-4 col-8">
                            <button
                              className="button d-flex align-items-center justify-content-center w-100"
                              onClick={() => setReplyID(item.id)}
                            >
                              <FaReply className="me-2" />
                              Reply
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-center my-4">No data found</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ToDo;
