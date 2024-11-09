import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import Auth from "./utility/Auth";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";
import ReportChange from "./pages/ReportChange";
import AdvocateLawyer from "./pages/AdvocateLawyer";
import ParaLegal from "./pages/ParaLegal";
import MakePayment from "./pages/MakePayment";
import AccountManager from "./pages/AccountManager";
import Documents from "./pages/Documents";
import ToDo from "./pages/ToDo";
import Journal from "./pages/Journal";
import Ticket from "./pages/Ticket";
import Help from "./pages/Help";
import TermsConditions from "./pages/TermsConditions";
import FAQ from "./pages/FAQ";
import SignUp from "./pages/SignUp";
import RegistrationfFlow from "./pages/RegistrationfFlow";
import Proceed from "./pages/Proceed";
import Income from "./pages/Income";
import Description from "./pages/Description";
import PaymentPage from "./pages/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage";
import Offer from "./pages/Offer";
import Encouragement from "./pages/Encouragement";
import Hold from "./pages/Hold";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import Privacypolicy from "./pages/Privacypolicy";
import TermsConditionpage from "./pages/Terms-Conditionpage";



const App = () => {
  return (
    <AppContextProvider>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth Component={Home} />} />
        <Route path="/userdetails" element={<Auth Component={UserDetails} />} />
        <Route
          path="/reportchange"
          element={<Auth Component={ReportChange} />}
        />
        <Route
          path="/advocatelawyer"
          element={<Auth Component={AdvocateLawyer} />}
        />
        <Route path="/paralegal" element={<Auth Component={ParaLegal} />} />
        <Route path="/makepayment" element={<Auth Component={MakePayment} />} />
        <Route
          path="/accountmanager"
          element={<Auth Component={AccountManager} />}
        />
        <Route path="/documents" element={<Auth Component={Documents} />} />
        <Route path="/todo" element={<Auth Component={ToDo} />} />
        <Route path="/journal" element={<Auth Component={Journal} />} />
        <Route path="/ticket" element={<Auth Component={Ticket} />} />
        {/*  */}
        <Route path="/help" element={<Help />} />
        {/*  */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />




        <Route path="/registrationfflow" element={<RegistrationfFlow />}/>
        <Route path="/proceed" element={<Auth Component={Proceed} />}/>
        <Route path="/income-and-expense" element={<Auth Component={Income} />}/>
        <Route path="/description" element={<Auth Component={Description} />}/>
        <Route path="/payment" element={<Auth Component={PaymentPage} />} />
        <Route path="/enroll" element={<Auth Component={ ThankYouPage}/>} />
        <Route path="/offer" element={<Auth Component={ Offer}/>} />
        <Route path="/encouragement" element={<Auth Component={ Encouragement}/>} />
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/hold" element={<Auth Component={Hold }/>} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        {/*  */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms-conditionpage" element={<TermsConditionpage />} />
        <Route path="*" element={<NotFound />} />

        {/* try and test cards */}
      
      </Routes>
      <ToastContainer />
    </AppContextProvider>
  );
};

export default App;
