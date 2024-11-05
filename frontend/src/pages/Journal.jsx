import React, { useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";
import { BsArrowReturnRight } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";

const Journal = () => {
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
  const [journal, setJournal] = useState([]);
  const [loading, setloading] = useState(true);
  const getjournal = async () => {
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
      const data = await res.data.data;
      data.forEach((obj) => {
        for (const key in obj) {
          if (obj[key] === null) {
            obj[key] = "";
          }
        }
      });
      data.forEach((item) => {
        let date = "";
        let time = "";
        date = item.Created_Time.split("T")[0].split("-").reverse().join("-");
        time = item.Created_Time.split("T")[1].split("+")[0];
        item.Created_Time = `${date} at ${time}`;
      });
      const filtered = data.filter((item) => {
        return item.Comments !== null;
      });
      setJournal(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getjournal();
  }, []);
  return (
    <>
        <AppBar />
      <div className="container p-2 py-4">
        <h2 className="text-center mb-3">Activities</h2>
        {loading ? (
          <Loading />
        ) : (
          <>
            {journal.length !== 0 ? (
              <>
                {journal.map((item, index) => {
                  return (
                    <div
                      className={`border bg-white rounded p-2 ${
                        index === journal.length - 1 ? "" : "mb-2"
                      }`}
                      key={index}
                    >
                      <p>
                        <span className="fw-bold">Title</span>: {item.Title}
                      </p>
                      <div className="my-2">
                        <p>
                          <span className="fw-bold">Your message</span>:{" "}
                          {item.Client_Comments}
                        </p>
                        {item.Agent_Comments !== null ? (
                          <p className="d-flex align-items-start justify-content-start gap-2 ms-2">
                            <span style={{ width: "25px" }}>
                              <BsArrowReturnRight className="fs-3" />
                            </span>
                            <span>
                              <span className="fw-bold">Agent message</span>:{" "}
                              {item.Agent_Comments}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>
                        <span className="fw-bold">Date & Time</span>:{" "}
                        {item.Created_Time}
                      </p>
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

export default Journal;
