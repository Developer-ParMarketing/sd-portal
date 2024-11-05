import React, { useState } from "react";
import { FaHome, FaMinus, FaPlus } from "react-icons/fa";
import { faq } from "../assets/data/faq";
import { Link } from "react-router-dom";
import colorLogo from "../assets/images/color logo.png";

const FAQ = () => {
  const [accordionIndex, setAccordionIndex] = useState(0);
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
        <div className="text-center mt-4">
          <h2>FAQ</h2>
        </div>

        {/*  */}

        <div className="my-accordion">
          <ol className="p-0 m-0">
            {faq.map((item, index) => {
              return (
                <li
                  className={`py-4 ${
                    index === faq.length - 1 ? "" : "bottom-border"
                  }`}
                  key={index}
                >
                  <div
                    className="d-flex align-items-start justify-content-between gap-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div>
                      <h3 className="mb-2">{item.question}</h3>
                      <p
                        className={`my-accordion-body ${
                          accordionIndex === index ? "active" : ""
                        }`}
                        id={item.id}
                        key={index}
                      >
                        {item.answer}
                      </p>
                    </div>
                    <div className="primary-text">
                      {accordionIndex === index ? <FaMinus /> : <FaPlus />}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-2 mb-4">
          <h3 className="text-lowercase">
            If you have any questions about SingleDebt, online FAQ's or
            procedures, please email us at:
            <a href="info@SingleDebt.in" className="ms-2">
              <h3 className="d-inline">info@SingleDebt.in</h3>
            </a>
          </h3>
        </div>
      </div>
    </>
  );
};

export default FAQ;
