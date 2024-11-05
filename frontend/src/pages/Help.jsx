import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import userManual from "../assets/data/Debt Management Portal User Manual.pdf";
import colorLogo from "../assets/images/color logo.png";
import { FaHome, FaPlus, FaMinus } from "react-icons/fa";
import callForwarding from "../assets/video/Call-Forwarding-SD.mp4";
//
import guideline1 from "../assets/data/RBI_Guidelines_1.pdf";
import guideline2 from "../assets/data/RBI_Guidelines_2.pdf";

const Help = () => {
  const videoRef = useRef(null);

  const [accordionIndex, setAccordionIndex] = useState(0);
  //
  const toggleAccordion = (id) => {
    if (accordionIndex === id) {
      return setAccordionIndex(null);
    } else {
      setAccordionIndex(id);
    }
  };
  return (
    <>
    
      <div className="container-fluid bg-white p-2 sticky-top d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/">
            <img src={colorLogo} alt="logo" loading="lazy" />
          </Link>
        </div>
        <Link to="/" className="button text-uppercase">
          <FaHome /> Home
        </Link>
      </div>
      {/*  */}
      <div className="container p-2">
        <div className="mb-4 text-center">
          <h1>Help & Support</h1>
          <p className="fw-bold my-2">
            To learn how to use our SingleDebt portal, please download the
            "SingleDebt Portal Guide."
          </p>
          <a
            href={userManual}
            className="button d-inline-block"
            download="SingleDebt brouchre"
          >
            Download
          </a>
        </div>

        {/*  */}

        <div>
          <div className="row align-items-center justify-content-center">
            <div className="col-l-6 col-md-8">
              <p className="fw-bold mb-2">
                Activate Call Forwarding for Enhanced Support
              </p>

              <video ref={videoRef} className="w-100" controls>
                <source src={callForwarding} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="my-accordion">
          <ol className="p-0 m-0">
            {/*  */}
            <li className="py-4">
              <div className="d-flex align-items-start justify-content-between gap-2">
                <div>
                  <h3 className="mb-2">
                    RBI Guideline for Harassment and Visit.
                  </h3>
                  <div
                    className={`my-accordion-body ${
                      accordionIndex === 0 ? "active" : ""
                    }`}
                    id="accordion0"
                  >
                    <div className="d-flex align-items-center justify-content-start gap-2">
                      <a
                        href={guideline1}
                        download={"RBI Guidelines 1"}
                        className="button"
                      >
                        Download RBI Guidelines 1
                      </a>
                      <a
                        href={guideline2}
                        download={"RBI Guidelines 2"}
                        className="button"
                      >
                        Download RBI Guidelines 2
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="primary-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleAccordion(0)}
                >
                  {accordionIndex === 0 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
            </li>
            {/*  */}
            <li className="py-4">
              <div className="d-flex align-items-start justify-content-between gap-2">
                <div>
                  <h3 className="mb-2">
                    Verify Your Call Forwarding Setup for Enhanced Support
                  </h3>
                  <p
                    className={`my-accordion-body ${
                      accordionIndex === 1 ? "active" : ""
                    }`}
                    id="accordion1"
                  >
                    <span className="fw-bold">
                      Please follow the steps below to check and confirm the
                      call forwarding feature on your phone:
                    </span>{" "}
                    <br />
                    <br /> For Vodafone/Idea Users: <br /> To Activate Call
                    Forwarding: <br />
                    <br />
                    Always Forward: Activate by dialing 21[Forwarding Number]#{" "}
                    <br />
                    Example: 2102268762601# (Replace 02268762601 with your
                    preferred forwarding number) <br /> Forward on No Answer:
                    61[Forwarding Number]# <br /> Forward on Busy: 67[Forwarding
                    Number]# <br /> Forward on Not Reachable: 62[Forwarding
                    Number]# <br /> <br /> To Deactivate Call Forwarding: <br />
                    Deactivate All: #21# Deactivate Forward on No Answer: #61#{" "}
                    <br />
                    Deactivate Forward on Busy: #67# <br /> Deactivate Forward
                    on Not Reachable: #62# <br />
                    <br /> For Airtel Users: <br /> Activation Codes: <br />
                    <br /> Always Forward: 21[Forwarding Number]# <br /> Forward
                    on No Answer/Not Reachable: 62[Forwarding Number]# <br />{" "}
                    Forward on Busy: 67[Forwarding Number]# <br /> Deactivation:
                    Deactivate All Call Forwarding: #21# <br /> Deactivate
                    Forward on No Answer/Not Reachable: #62# <br /> Deactivate
                    Forward on Busy: #67# <br />
                    <br /> For Jio Users: Activation Codes: <br />
                    Always Forward: <br />
                    <br /> 401[Forwarding Number]# <br /> Forward on No Answer:
                    403[Forwarding Number]# <br /> Forward on Busy:
                    405[Forwarding Number]# <br /> Forward on Not Reachable:
                    409[Forwarding Number]# <br />
                    <br /> Deactivation: <br /> Deactivate All Call Forwarding:
                    #401# <br /> Deactivate Forward on No Answer: #403# <br />{" "}
                    Deactivate Forward on Busy: #405# <br /> Deactivate Forward
                    on Not Reachable: #409# <br />
                    <br /> Should you encounter any issues or have questions
                    about this setup, please do not hesitate to contact us
                    immediately. Your feedback is invaluable to us, and we are
                    committed to addressing any concerns you may have. Thank you
                    for your cooperation and for continuing to place your trust
                    in our services. We look forward to ensuring your complete
                    satisfaction with our support. <br />
                    <br /> Team SingleDebt
                  </p>
                </div>
                <div
                  className="primary-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleAccordion(1)}
                >
                  {accordionIndex === 1 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
            </li>
            {/*  */}
            <li className="py-4">
              <div className="d-flex align-items-start justify-content-between gap-2">
                <div>
                  <h3 className="mb-2">
                    Verify Your Call Forwarding Setup for Enhanced Support
                  </h3>
                  <p
                    className={`my-accordion-body ${
                      accordionIndex === 2 ? "active" : ""
                    }`}
                    id="accordion2"
                  >
                    As one of our esteemed existing clients, you have exclusive
                    access to our comprehensive legal services at a highly
                    competitive cost. Whether you require legal advice,
                    assistance, or representation, our team is here to support
                    you every step of the way. <br />
                    <br /> Please don't hesitate to reach out to us via our
                    official email address for any legal inquiries or assistance
                    you may need. We're committed to ensuring your legal needs
                    are met with professionalism and expertise. <br />
                    <br /> Thank you for choosing us as your trusted partner.{" "}
                    <br />
                    Team SingleDebt
                  </p>
                </div>
                <div
                  className="primary-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleAccordion(2)}
                >
                  {accordionIndex === 2 ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
            </li>
            {/*  */}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Help;
