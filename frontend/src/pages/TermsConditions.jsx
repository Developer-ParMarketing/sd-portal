import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import colorLogo from "../assets/images/color logo.png";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TermsConditions = () => {
  const location = useLocation(); // Get the current location and data passed from the Card component

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const { title, emi, oneTimeFee } = location.state || {};
  const calculatedEMI = localStorage.getItem("calculatedEMI");
  const subscription = localStorage.getItem("subscription");
  const totalbil = localStorage.getItem("totalbil");

  const handleConfirmClick = () => {
    if (isChecked) {
      // Redirect to the payment page
      localStorage.setItem("termsAccepted", "true");

      navigate("/");
      navigate("/payment", {
        state: {
          title,
          calculatedEMI,
          subscription,
          oneTimeFee,
          totalbil,
          emi,
        },
      });
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
      <div
        className="container p-2"
        style={{
          border: "1px solid black", // Border for the whole section
          // borderRadius: "10px", // Rounded corners
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a clean look
          // backgroundColor: "#f9f9f9", // Light background color
          maxHeight: "500px", // Set a fixed height
          overflowY: "auto",
        }}
      >
        <div className="container mt-5">
          {/* Title Section */}
          <div className="text-center mt-4">
            <h2
              style={{
                color: "#ff4855", // Custom color for the heading
                fontWeight: "bold", // Bold the title
                borderBottom: "2px solid #ff4855", // Add a border below the heading
                display: "inline-block", // Ensures the border is only as wide as the text
                paddingBottom: "8px", // Adds space between the text and border
              }}
            >
              Terms & Conditions
            </h2>
          </div>

          {/* Content Section */}
          <div
            className="mb-4 p-4"
            style={{
              border: "1px solidblack", // Border for the whole section
              borderRadius: "10px", // Rounded corners
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a clean look
              backgroundColor: "#f9f9f9", // Light background color
            }}
          >
            <p className="mb-4 fw-bold fs-5">
              The Terms and Conditions of business explain our obligations to
              you and yours to us.
            </p>

            <h3 className="fw-bold mb-2" style={{ color: "#333" }}>
              Definition of terms:
            </h3>

            <ul className="tandclist" style={{ paddingLeft: "20px" }}>
              {[
                {
                  title: "Agreement",
                  description: `means the agreement between you and us made mainly on these terms and conditions of business.`,
                },
                {
                  title: "Advocate and Lawyers",
                  description: `means panel of Advocate and Lawyers that work with City Credit Management LLP.`,
                },
                {
                  title: "Creditors",
                  description: `means all your unsecured creditors whose details you will provide us with in accordance with section 7.`,
                },
                {
                  title: "Debt Management Program (DMP)",
                  description: `means the plan of repayments by which you repay your Creditors through us (as may be revised from time to time).`,
                },
                {
                  title: "Disposable Income (DI)",
                  description: `means your total income minus your living expenses`,
                },
                {
                  title: "Fees",
                  description: `means the initial Fee and the Monthly Payment Fee (as defined below) payable by you to us when enrolled onto a BDP, in accordance with section 7.1 & 7.2`,
                },
                {
                  title: "Initial Fee",
                  description: `(Administration Payment) means your first two Monthly Payments which is paid by you to us as an initial fee for preparation of the Business Debt Programme which is not used to pay your creditors.`,
                },
                {
                  title: "Monthly Fee",
                  description: `means the balance of the amount after paying all your creditors from your DI plus GST and taxes after the second month.`,
                },
                {
                  title: "Monthly Payment",
                  description: `means the total amount which is paid every month by you to us throughout the period as worked out under your “Your Financial Statement” whiles you are enrolled on BDP. Apart from your first two Monthly Payment which is the initial Fee this is made up of the Monthly Repayment to be made to your Creditors our Monthly Fee plus GST and taxes and any other payments as instructed or agreed with you.`,
                },
                {
                  title: "Period",
                  description: `means the period during which the Business Debt Programme (BDP) will operate.`,
                },
                {
                  title: "Your Financial Statement",
                  description: `is the total income, expenditure, and debts as per provided by you in accordance with section 6.`,
                },
                {
                  title: "Your Debts",
                  description: `means the full details of your total unsecured debts, including creditor's name, main and branch addresses, account number, NEFT number, outstanding balance, EMI, and mode of payment of EMI`,
                },
                {
                  title: "Authority to Act",
                  description: `means you will provide us with a letter of authority to act and/or a power of attorney.`,
                },
                {
                  title: "Services",
                  description: `means the services we agree to provide you with under this Agreement.`,
                },
                {
                  title: "Business Day",
                  description: `means a day (other than a public holiday) on which banks are open for general business in Mumbai.`,
                },
                {
                  title: "Credit Information Report",
                  description: `means the credit information / scores/ aggregates / variables / inferences or reports which shall be generated by Credit Information Companies like Experian.`,
                },
                {
                  title: "Credit Score",
                  description: `means the score which shall be mentioned on the Credit Information Report which shall be computed by Experian & other companies.`,
                },
                {
                  title: "CICRA",
                  description: ` shall mean the Credit Information Companies (Regulation) Act, 2005 read with the Credit Information Companies Rules, 2006 and the Credit Information Companies Regulations, 2006, and shall include any other rules and regulations prescribed thereunder.`,
                },
                {
                  title: "Term and Conditions of Business",
                  description: ` - (T & C) means these terms and conditions of business.`,
                },
                {
                  title: "Us",
                  description: (
                    <>
                      and <strong>"We"</strong> mean City Credit Management LLP
                      trading as SingleDebt or anyone to whom we transfer our
                      obligations and rights under this Agreement.
                    </>
                  ),
                },
                {
                  title: "You",
                  description: ` means you (the person that is enrolled onto BDP) and your partner where any of the debts are in joint names.usiness.`,
                },
              ].map((item, index) => (
                <li key={index} className="mb-3" style={{ lineHeight: "1.6" }}>
                  <span className="fw-bold" style={{ color: "#ff4855" }}>
                    "{item.title}"
                  </span>{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*  */}

        {/*  */}

        <div
          className="container mt-5 "
          style={{
            border: "1px solidblack", // Border for the whole section
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a clean look
            backgroundColor: "#f9f9f9", // Light background color
          }}
        >
          <ol
            className="tandclist ps-0"
            style={{
              // border: "2px solid #e0e0e0",
              // borderRadius: "10px",
              // padding: "30px",
              // backgroundColor: "#fafafa",
              // maxWidth: "100%",
              wordWrap: "break-word",
              overflow: "hidden", // Ensure contents stay inside the box
            }}
          >
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                INFORMATION COLLECTION, USE, CONFIDENTIALITY, NON-DISCLOSURE AND
                DATA PURGING
              </h3>

              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li
                  className="mb-3"
                  style={{
                    textAlign: "justify",
                    lineHeight: "1.8",
                    wordWrap: "break-word",
                  }}
                >
                  City Credit Management LLP trading as SingleDebt shall access
                  your Credit Information as your authorized representative,
                  agent, and Attorney. City Credit Management LLP trading as
                  SingleDebt shall use the Credit Information for the limited
                  End Use Purpose consisting of and in relation to the services
                  proposed to be availed by you from City Credit Management LLP
                  trading as SingleDebt. We shall not aggregate, retain, store,
                  copy, reproduce, republish, upload, post, transmit, sell or
                  rent the Credit Information to any other person, and the same
                  cannot be copied or reproduced other than as agreed herein and
                  in furtherance to CICRA Act.
                </li>
                <li
                  style={{
                    textAlign: "justify",
                    lineHeight: "1.8",
                    wordWrap: "break-word",
                  }}
                >
                  The Parties agree to protect and keep confidential the Credit
                  Information both online and offline. <br />
                  The Credit Information shared by you or received on your
                  behalf shall be destroyed, purged, erased promptly within 1
                  (one) Business Day of the completion of the transaction/End
                  Use Purpose for which the Credit Information report was
                  procured.
                </li>
              </ul>
            </li>

            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                APPOINTMENT AND PERIOD
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li
                  style={{
                    textAlign: "justify",
                    lineHeight: "1.8",
                    wordWrap: "break-word",
                  }}
                >
                  You appoint us and we agree to provide the Services (as
                  defined below)
                </li>
                <li>
                  This Agreement will commence the date we receive the
                  “Authority to Act”, the T & C and your first payment or your
                  first part payment.
                </li>
                <li>
                  The day we receive the initial Fee from you may not be the
                  same day you have received the T & Cs the payment date will
                  not affect the commencement of your plan or your ability to
                  cancel. This Agreement will continue for the period unless
                  ended earlier by you as set out in the sections detailed
                  below.
                </li>
              </ul>
            </li>

            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                SERVICES
              </h3>

              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  We will review your finances covering your income,
                  expenditure, debts, and assets. These must include all debt
                  secured on property or goods which we will take into
                  consideration but cannot negotiate reduced payments on. We
                  will calculate your disposable income based on reasonable
                  living expenses. We may on investigation deem that the
                  Business Debt Programme is not best advice, and in that case,
                  we will inform you of any other plans or services that we can
                  offer.
                </li>
                <li>
                  In consultation with you we will produce a Baseness Debt
                  Programme by which you can pay off your creditors out of your
                  disposable income at rates that you can afford. The Business
                  Debt Programme will let you make monthly payments to us and
                  will take account of your Creditors and of our Fees. It will
                  not take account of any matters you have not told us about in
                  accordance with section 6, it will also take account of the
                  differing requirements of your different Creditors if there is
                  more than one.
                </li>
                <li>
                  We will negotiate with your Creditors and attempt to agree
                  repayment terms with them of the amounts outstanding. In doing
                  so we shall use the Basiness Debt Programme and we will try to
                  convince that the periodic payments that we agree with your
                  Creditors on your behalf do not exceed your disposable income
                  (after considering the fees charged by us) as calculated by us
                  for the same period. We cannot guarantee they will freeze your
                  interest and charges if the level of Payment you can afford is
                  below your creditors' minimum level of acceptance. The payment
                  you make may not offset any charges your Creditors choose to
                  add to the opening balance. We shall attempt to agree with
                  your Creditors where appropriate that they Freeze or reduce
                  their interest and charges and that they suspend or withdraw
                  enforcement proceedings issued in connection with your
                  agreements with them. We shall make payments to your Creditors
                  in accordance with the Business Debt Programme, and the
                  payment shall be made by electronic means or cheques. We,
                  under no circumstances will be responsible for any delays made
                  to your creditor's accounts due to the accounting processes
                  your creditors choose to use or any delay in banking or
                  crediting your payments to your account with your creditor.
                </li>
                <li>
                  Should your circumstances change during the Period we shall
                  review the Business Debt Programme and if necessary, make
                  changes to it in agreement with you and with any Creditors
                  concerned, it is your responsibility to make us aware of all
                  charges that affect the payment and continuity of your
                  program. All payments to us will be made into our client
                  account. This account is separate to our own business accounts
                  and funds held for distribution to your Creditors and shall be
                  retained for that purpose only. No interest will be payable to
                  you on funds that we hold. At all-time funds held for
                  distribution to your Creditors will be classed as client
                  monies.
                </li>
                <li>
                  During the negotiation process some Creditors may continue to
                  charge interest and other recovery charges. We cannot always
                  prevent these charges being levied. These will be added to
                  your balance and be paid off as part of your Business Debt
                  Programme.
                </li>
                <li>
                  We also offer to negotiate Full & Final settlements on behalf
                  of our clients. Our fees are negotiable but will be a minimum
                  of 10% of the agreed settlement.
                </li>
              </ul>
            </li>

            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                COMPLAINTS
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  We take any complaint regarding our practices seriously. Any
                  complaints can be sent in writing to Complaints Officer at
                  customercare@singledebt.in. Your complaint will be
                  acknowledged within 7 working days, and a response to your
                  complaint will be made within 14 days. If you are not happy
                  with the response your complaint will be escalated to the
                  compliance officer and all communication regarding the
                  complaint will only be in writing. You will receive a copy of
                  our Code of Conduct and Complaint procedure. Any Data Access
                  requests must be completed on our company access request form
                  and accompanied by a fee of 500/- Rupees this request must be
                  made in writing only by the data subject.
                </li>
                <li>
                  To protect us against “troll-like” virulent reviews, often
                  posted solely for vengeance purposes, and false or misleading,
                  inappropriate, or irrelevant reviews. You would need to inform
                  us of your dissatisfaction or complaint and give us the
                  opportunity to re-address it to both of our satisfaction as
                  above. If we are unable to resolve the complaint, arising out
                  of this Agreement then this will be resolved by way of
                  procedure provided in the Arbitration and Conciliation Act,
                  1996. The Venue and the seat of the Arbitration shall be
                  Mumbai. The Arbitration is to be conducted by a sole
                  Arbitrator appointed by City Credit Management LLP, (As per
                  sec. 14.5). Thereafter you will be entitled to post a review,
                  prior to this you will be in violation of this provision and
                  would have to pay liquidated damages and Company's legal fees.
                </li>
              </ul>
            </li>

            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                ADVOCATES AND LAWYERS
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  In respect to any legal matters, our panel of Lawyers will
                  advise you on any legal points in respect to the Business Debt
                  Programme and legal notices, bounced cheques, power of
                  attorney, Banking Ombudsman, mediation & arbitration hearings.
                  If you thereafter engage our panel of lawyers to deal with
                  attending any hearings related to your legal notices, bounced
                  cheque, Banking Ombudsman, mediation, arbitration & any
                  litigation than the Advocate or Lawyer will inform you of
                  their charges in handling that matter.
                </li>
              </ul>
            </li>

            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                YOUR RESPONSIBILITIES
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  It will be your responsibly to obtain all the documents from
                  all your creditors, if there is a delay in you not providing
                  us with these documents that we have requested than this will
                  impact on the service that we can provide, including and not
                  limited to freezing of interest and charges. You will provide
                  to us on request information relating to your finances. This
                  will include but will not be limited to details & evidence of
                  your income and expenditure, your creditors, and any agreement
                  you have with them, any loans or home loans you have, your
                  dependents and any Notices that has been served against you or
                  any other enforcement action or Arbitration hearing being
                  taken against you.
                </li>
                <li>
                  You will sign any necessary forms of authority i.e., power of
                  attorney or any other documents so that we may negotiate and
                  make payments to your Creditors on your behalf.
                </li>
                <li>
                  In entering into this AGREEMENT, you acknowledge that
                  SingleDebt will be undertaking any action solely in its
                  capacity as your Non- exclusive Agent and Attorney-in-Fact
                  pursuant to the terms of this Agreement and the Letter of
                  Authority or related Limited Power of Attorney that you have
                  signed. You acknowledge that SingleDebt has not advised you to
                  reduce or terminate payments to your creditors and you have
                  been advised that SingleDebt will not take any action that
                  might be construed as interfering with the contractual
                  relationships between you and your creditors
                </li>
                <li>
                  You will sign any necessary forms of authority i.e., Letter of
                  Authority (LOA) or Power of Attorney (POA) or any other
                  documents so that we may negotiate and make payments to your
                  Creditors on your behalf:
                  <ul style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                    <li>
                      {" "}
                      You shall provide complete and accurate information
                      related to the debts to SingleDebt in writing.
                    </li>
                    <li>
                      You agree to provide the name, address, telephone number,
                      Email address and last loan statement from each Creditor
                      to SingleDebt along with all other information SingleDebt
                      deems necessary to assist it in negotiating proper
                      resolution of each
                    </li>
                    <li>
                      You to promptly provide/ communicate any change in
                      financial position, debt, or any other information which
                      could affect the outcome of a debt solution.
                    </li>
                    <li>
                      You shall disclose any pending court cases and litigation.
                    </li>
                    <li>
                      You will fill out and promptly return any papers and
                      questionnaires supplied and/or requested by SingleDebt.
                    </li>
                    <li>
                      You shall consider SingleDebt's recommendations regarding
                      any potential
                    </li>
                    <li>
                      You will alert SingleDebt of any material changes to your
                      financial status.
                    </li>
                    <li>
                      You shall timely pay SingleDebt for its fees as described
                      herein and acknowledges that all fees are considered
                      “earned” by SingleDebt when paid for services including
                      but not limited to, DMP Setup, Analysis of Debts for
                      Enrolment, Processing, Review of Documents, Marketing,
                      Client Acquisition, Operational Costs, Negotiations,
                      Enrolment costs, Legal and Creditor's call diversion
                      services.
                    </li>
                  </ul>
                </li>
                <li>
                  You will forward to us copies of all correspondence from your
                  Creditors and keep us informed of any dealings you have with
                  any Creditors whether we are negotiating with them or not.
                  Once the Business Debt Programme has been agreed, you will not
                  make any expenditure over and above your reasonable living
                  expenses as calculated in the Business Debt Programme. You
                  will not use your credit cards nor incur further debts during
                  the period.
                </li>
                <li>
                  You will consult with us in relation to your Business Debt
                  Programme and in relation to any alterations and/or reviews of
                  it. Your payments to us will need to be amended to reflect any
                  reasonable changes which your circumstances dictate. You will
                  make payments to us under and in accordance with the Business
                  Debt Programme promptly and without any deductions.
                </li>
                <li>
                  On occasion your Creditors may not provide us with balances
                  and documents of your accounts due to their own company
                  procedures. If these circumstances arise, then you will obtain
                  this information and documents for us and supply us
                  accordingly.
                </li>
                <li>
                  We cannot be held responsible for any legal action taken
                  against you by your creditors because of fraudulent or
                  incorrect information provided by you at the time of acquiring
                  a loan, EMI agreement, credit card or any other form of
                  credit.
                </li>
                <li>
                  Lack of contact from you will not be considered a cancellation
                  of the Agreement.
                </li>
                <li>
                  If you do not maintain regular payments, we will suspend any
                  action and payments on your account. Your creditors may have
                  to be informed that payments are not being maintained. This
                  may result in your creditors continuing legal action against
                  you for which we cannot be held responsible.
                </li>
                <li>
                  If your payments are late your creditors may continue or
                  re-commence adding interest and charges, we cannot be held
                  responsible for these charges.
                </li>
                <li>
                  You remain responsible for continuing to pay any secured
                  loans, mortgages or consumer goods agreements and all
                  household bills (including insurances).
                </li>
                <li>
                  In entering into this AGREEMENT, you represent that no
                  enrolled creditor accounts are secured by collateral or cross
                  collateralized with another account or property. Secured debt
                  is debt for which the creditor has collateral in the form of a
                  security interest in personal and/ or real property. Should
                  you fail to make timely payments on a secured debt, the
                  creditor is entitled to repossess the property and sell it.
                  Cross-collateralized debt exists where security has been
                  mortgaged and pledged to a creditor under a document that
                  provides that the collateral not only secures primary
                  obligations such as a property or a car, but also other debt
                  that may include enrolled debt. A creditor may also have the
                  right to offset your enrolled obligations against bank or
                  other accounts maintained by that creditor in your name.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                Fees
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  When you enrol on the BDP you will pay to us the initial Fee,
                  the monthly Fee, and the Monthly Repayments plus GST and taxes
                  and other fees agreed in writing between you and us for
                  additional services.
                </li>
                <li>
                  We reserve the right to increase our fees at any time. You
                  will be informed before your next payment.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                HOW WE HANDLE YOUR MONEY
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  All payments that we receive from you in cleared funds will be
                  paid directly into our client accounts. The only deductions
                  which we will make out of our client account are:
                  <ul style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                    <li>Payment of our Fees plus GST and taxes.</li>
                    <li>
                      Payment of Monthly Repayments to your Creditors in
                      accordance with the Business Debt Programme
                    </li>
                    <li>
                      Any other payments as instructed or agreed with you.
                    </li>
                    <li>
                      Any other payments required to maintain the services
                      rendered under BDP.
                    </li>
                  </ul>
                </li>
                <li>
                  We will distribute the Monthly Repayments amongst your
                  Creditors in accordance with the Business Debt Programme
                  normally within seven working days of clearance of the Monthly
                  Payment from you. If there is a delay from the creditor's side
                  due to the accounting processes from your creditors or any
                  delay in banking or crediting your payments to your account
                  with your creditor, in which case we will not be responsible.
                </li>
                <li>
                  You must ensure that your payment to us reaches us in
                  sufficient time to be cleared and transferred to your
                  creditor. Any late payment charges made by the creditor will
                  not be the responsibility of City Credit Management LLP
                  trading as SingleDebt.
                </li>
                <li>
                  It is imperative that your payments are made on due date of
                  every month, this will ensure that all your creditors are paid
                  as per the new arrangements. Otherwise, this will make it
                  difficult for us to negotiate a new arrangement with your
                  creditors and then there is the probability that your
                  creditors will not approve the new arrangements and will
                  continue with their recovery processes and legal action
                  against you.
                </li>
                <li>
                  We will email and WhatsApp you, five days prior to your due
                  date for payment, please ensure that payment is made on a
                  timely manner to ensure smooth running of your debt program.
                </li>
                <li>
                  All payments to your creditors will be done by cheque to
                  ensure full transparency in our transactions, if payments are
                  received by us on due date than we will pay all your creditors
                  within seven working days (this process is all computerized).
                  If payments are not made by due date than payments to your
                  creditors will be delayed, because our accounts department
                  will have to manually process these payments, and this would
                  take much longer to process.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                YOUR RIGHT TO TERMINATE
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  Any notice of termination must be emailed to{" "}
                  <a href="customercare@singledebt.in">
                    customercare@singledebt.in
                  </a>
                </li>
                <li>
                  You have the right to cancel this Agreement. In the event of
                  cancellation under this section you may cancel the plan in the
                  first month by giving us written notice within 7 (seven)
                  working days of signing the T& C. It is only then that we will
                  refund your first month initial fee or part payment that you
                  have made and that has cleared through our bank account,
                  notwithstanding section 9.3.
                </li>
                <li>
                  In the event of a refund during your second month, your first
                  two monthly payments (initial fee), we will deduct the fee
                  pertaining towards any legal work undertaken in dealing with
                  your Creditors and any concerned instances of harassment, like
                  writing to your creditors, attending telephone calls, drafting
                  non-cognizable (NC), First Information Report (FIR), attending
                  police stations, courts, replies and drafting to legal
                  notices, power of attorney and dealing with Banking Ombudsman,
                  mediation & initial arbitration matters. We will deduct ₹3,000
                  rupees for dealing with each one of these actions from the
                  initial fee. Otherwise, these legal services will be provided
                  free of charge if you stay on the BDP.
                </li>
                <li>
                  You may also cancel this Agreement at any time if the total
                  Fees payable under the Business Debt Programme increase from
                  the fees we estimated to you at the commencement of the
                  Agreement provided that this right to cancellation will not be
                  available in the event that such difference in Fees is due to
                  any misrepresentation by you of your finances, including
                  without limitation, your Creditors in the event of
                  cancellation under this section 9.4, we reserve the right to
                  retain the initial Fee.
                </li>
                <li>
                  In addition to your right to cancel under section 9.2, 9.3,
                  and 9.4, you may also end this agreement at any time by giving
                  us two weeks prior written notice which you may serve at any
                  time whether you believe we may have been in breach of our
                  obligations under this Agreement. In the event of cancellation
                  under this section 9.5 we will refund any “Monthly Payment”
                  that has not been issued to the Creditors minus our "Monthly
                  fee".
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                OUR RIGHT TO TERMINATE
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  We hold the right to terminate this Agreement in case:
                  <ul style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                    <li>You fail to make two successive Monthly Payments or</li>
                    <li>
                      You are otherwise in serious breach of this Agreement or
                      have persistently committed a series of minor breaches
                      (even if anyone individual breach would not necessarily be
                      regarded as a serious breach or its own): or
                    </li>
                    <li>
                      You become bankrupt, make an agreement or composition with
                      your Creditors
                    </li>
                    <li>
                      We are prevented from fulfilling our obligations by reason
                      of force majeure.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                OUR RIGHT TO TERMINATE
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  All parties can terminate this agreement at any time. Any
                  money held by us on customer behalf will then be paid to
                  customer or paid to customer's creditors if payment has been
                  processed.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                CHARGES FOR SERVICES
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  We will not charge anything for services in the general course
                  of business. However, to help pay for the service we are
                  entitled to retain any credit interest earned prior to the
                  distribution of customer BDP payment.
                </li>
                <li>
                  You shall be fully liable to bear the costs which we incur
                  because of all claims against us because of inaccurate,
                  incorrect, or incomplete information provided by you.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                CONSENT
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  You as a customer permits us to hold data about yourself and
                  share it with others in accordance with the law the Data
                  Protection Consent in this Agreement.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                GENERAL TERMS AND CONDITIONS
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  This Agreement sets out the entire understanding between the
                  parties and supersedes all prior agreements understandings or
                  arrangements (whether oral or written) relating to the
                  provision of the Services.
                </li>
                <li>
                  You acknowledge that you have entered into this Agreement in
                  reliance only on the representations, warranties and promises
                  specifically contained or incorporated in the agreement and
                  except as expressly set out in this Agreement and that we
                  shall bear no liability in respect of any representation,
                  warranty or promise made prior to the start of this Agreement
                  unless it was made fraudulently.
                </li>
                <li>
                  We shall not be deemed to be in breach of this Agreement or
                  otherwise liable to you if we are prevented from performing
                  our obligations under this Agreement by reason of any event
                  beyond our reasonable control.
                </li>
                <li>
                  Since you have voluntarily decided to not make required
                  minimum payments to your creditors you may be breaking the
                  terms of your agreements with them. It is likely your actions
                  will be reported to credit reference agencies (credit bureaus)
                  as late, delinquent, charged-off or past due balances. Your
                  creditor may also raise the interest rate on your account and
                  impose other penalties. Your account balance will continue to
                  grow as your creditor adds accrued interest, late fees,
                  over-limit fees and penalties. DMP and BDP may have an adverse
                  effect on your credit report and credit score depending on
                  your specific situation.
                </li>
                <li>
                  The Governing Law of this Agreement shall be the Substantive
                  law of India.
                </li>
                <li>
                  Any Dispute arising out of this Agreement shall be resolved as
                  and by way of procedure provided in the Arbitration and
                  Conciliation Act, 1996. The Venue and the seat of the
                  Arbitration shall be Mumbai. The Arbitration is to be
                  conducted by a sole Arbitrator appointed by City Credit
                  Management LLP.
                </li>
                <li>
                  {" "}
                  That all disputes are subject to Mumbai jurisdiction only.
                </li>
                <li>
                  That you also represent that you have signed the present
                  agreement out of your own free Will and consent without any
                  undue influence or pressure from any side.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                  marginBottom: "15px", // Ensure spacing
                }}
              >
                IMPORTANT NOTE: YOUR BANK ACCOUNT
              </h3>
              <p
                style={{
                  paddingLeft: "20px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0",
                }}
              >
                If you have a debt with a Bank where you have an account, they
                may use the money in your account to pay off the debt you have
                with them. It is advisable and your responsibility to open a new
                account with a Bank that is not connected to any of your
                creditors. This will ensure that you remain in control of your
                money and that you are able to pay your priority payments such
                as a home loan or rent etc. by doing this you will also be
                ensuring you are treating all your creditors on a fair and
                equitable basis.
              </p>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>Do not use where you have your home loan.</li>
                <li>
                  Tell your employer about the new account and check that there
                  is time to make the change and have your next salary paid in.
                </li>
                <li>
                  Remember to move any EMI payments such as your home loan,
                  secured loans, car EMI, utilities, insurances, etc. to your
                  new account.
                </li>
                <li>
                  You may wish to consider and will be your responsibility for
                  cancelling all your ECS that are connected to your debts that
                  are under the Business Debt Programme that you are enabled to
                  service to ensure that you do not incur bank charge for
                  returned payment fees.
                </li>
                <li>
                  We suggest that you apply to open a simple account. Explain
                  that you need a basic account to receive your salary that you
                  require a debit card and that you will not require any
                  borrowing. This should ensure that the account can be opened
                  without difficulty.
                </li>
              </ul>
            </li>
            <li>
              <h3
                className="text-uppercase fw-bold mb-4 text-center"
                style={{
                  color: "#ff4855",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                }}
              >
                EFFECTS OF A DEBT MANAGEMENT PLAN
              </h3>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "40px", // Ensure bullet points are inside
                  marginBottom: "20px",
                  marginTop: "0", // Remove extra space at the top
                }}
              >
                <li>
                  SingleDebt does not provide any credit repair or correction
                  services whatsoever, you understand that if you do not make
                  regular payments to creditors, added interest, late fees,
                  delinquencies, collection efforts, and legal action could
                  result. Such may also result in a substantial reduction in
                  your credit score and negative credit report.
                </li>
                <li>
                  If you have chosen not to remain current on your payment
                  obligations, you may lose important benefits of credit,
                  including loans or refinances, or have existing credit revoked
                  and could also end up in RBI's defaulter list.
                </li>
                <li>
                  You also understands that you should not enroll debt into
                  program from a lender where you also have other, open, and
                  funded accounts. In such situation, lender may take funds from
                  your other accounts to pay your obligations. After complete
                  full awareness and consideration of all these possibilities,
                  you still wish to proceed with the terms and conditions of
                  this Agreement.
                </li>
                <li>
                  You understands and agrees that in event of non-compliance of
                  SingleDebt and the obligations assigned gives the right to us
                  to terminate the agreement immediately.
                </li>
                <li>
                  Your DMP assumes an effort that will continue for many months.
                  The time needed to become debt free depends on a number of
                  factors These may include:
                  <ul style={{ paddingLeft: "20px", listStyleType: "circle" }}>
                    <li>The financial hardship,</li>
                    <li>
                      the age and balance of the accounts that you owe your
                      creditors,
                    </li>
                    <li>the funds you have available to pay into a DMP and</li>
                  </ul>
                </li>
                <li>
                  Since you have voluntarily decided to not make required
                  minimum payments to your creditors you may be breaking the
                  terms of your agreements with them. It is likely your actions
                  will be reported to credit reference agencies (credit bureaus)
                  as late, delinquent, charged-off or past due balances. Your
                  creditor may also raise the interest rate on your account and
                  impose other penalties. Your account balance will continue to
                  grow as your creditor adds accrued interest, late fees,
                  over-limit fees and penalties. DMP may have an adverse effect
                  on your credit report and credit score depending on your
                  specific situation.
                </li>
                <li>
                  To summarize, each case is unique, and results may vary. DMP
                  can be a very effective way to resolve your debt, but it is
                  not a painless process, and no guarantees can be given because
                  the process is subject to factors that neither you nor
                  SingleDebt may be able to as with any type of debt repayment
                  program, failure to complete a DMP is likely to have negative
                  consequences on your financial situation.
                </li>
                <li>
                  You expressly acknowledge that SingleDebt do not provide any
                  kind of tax and/or investment advice whatsoever. However, any
                  legal service will be provided by SingleDebt panel of
                  Advocates, who are independent entities.
                </li>
                <li>
                  You agree that SingleDebt does not claim to be able to improve
                  your credit rating or credit report, nor remove any credit
                  reference on your credit report and that SingleDebt has no
                  responsibility or obligation for any past, present, or future
                  credit rating assigned by any of the Creditors or for any
                  information contained in any credit reporting.
                </li>
              </ul>
            </li>
          </ol>
        
          {/*  */}
        </div>

        {/*  */}

      
      </div>
      <div className="container mt-4 " >
        <div className="text-center">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheckbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{border:'2px solid black'}}
            />
            <label
              className="form-check-label"
              htmlFor="termsCheckbox"
              style={{ fontSize: "14px", textAlign: "left" }}
            >
              <p
                className="mb-4"
                style={{
                  textAlign: "justify",
                }}
              >
                I confirm that I have read, understand, and agree to be bound by
                the terms & conditions of the agreement. I acknowledge that
                these services and the fees associated with the said services
                have been explained to my full satisfaction, and that I have no
                unanswered questions about the same.
              </p>
            </label>
          </div>

          <button
            className="btn btn-danger"
            style={{
              backgroundColor: isChecked ? "#ff4855" : "#d3d3d3", // Red color if checked, grey if not
              border: "none",
              padding: "10px 20px",
              margin: "20px 0px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition: "all 0.3s ease",
              cursor: isChecked ? "pointer" : "not-allowed",
            }}
            disabled={!isChecked} // Disable button if checkbox is not checked
            onMouseEnter={(e) =>
              isChecked && (e.currentTarget.style.backgroundColor = "#e63946")
            } // Hover effect only when enabled
            onMouseLeave={(e) =>
              isChecked && (e.currentTarget.style.backgroundColor = "#ff4855")
            }
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
