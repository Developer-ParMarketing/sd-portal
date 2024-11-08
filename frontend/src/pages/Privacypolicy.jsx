import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import colorLogo from "../assets/images/color logo.png";
import "../assets/css/PrivacyPolicy.css";

const PrivacyPolicy = () => {
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

      <div className="container py-4">
        <h1 className="text-center section mb-4">Privacy Policy</h1>

        <section className="section mb-4">
          <h3 className='h3'>How We Collect and Use Your Information</h3>
          <p className='p'>
            We, City Credit Management LLP trading as SingleDebt, respect the
            right to privacy of any individual entering or using this website.
            We ensure that any information we collect or hold about you is held
            securely and managed in line with data security and data protection
            legislation and best practice and only used in ways in that you have
            agreed to or would expect.
          </p>
          <p className='p'>
            We may use information provided to process your application and
            manage your Plan. The information may be kept electronically or on
            paper file for as long as the application is being considered, while
            your Plan is active and for an appropriate length of time after
            that.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>The Information We Collect</h3>
          <p className='p'>
            We collect information about you when you make an application,
            register for our newsletter, enter competitions, complete surveys,
            provide feedback or contact us through our website. We’ll keep your
            information and add it to our marketing database even if you don’t
            apply for a product. The information we ask for will be used to help
            us understand more about the visitors to our website and our
            customers. We may also use the information to improve our customer
            service, our products, our marketing and our website for the benefit
            of all our customers or visitors to our website.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Keeping Your Information Secure</h3>
          <p className='p'>
            We look after your personal data by having security that’s
            appropriate for its nature and the harm that might result from a
            breach of security.
          </p>
          <p className='p'>
            We don’t ask you for any more information than we need, and we don’t
            keep your information for any longer than we need to.
          </p>
          <p className='p'>
            We take reasonable steps to keep your details up to date and
            accurate. Please bear in mind that we may hold on to your records
            after we’ve stopped our service to you. This is to make sure we have
            an effective audit trail and to comply with legislative
            requirements.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Permission To Share Data</h3>
          <p className='p'>
            You hereby grant permission to share information regarding your data
            with any other party including the Creditors of your Enrolled Debts,
            to the extent necessary to facilitate your Account and to provide
            other services. You also acknowledge that sharing information among
            is essential to the administration of your Account and debts. You
            understand that the Agreement provides additional information
            relating to your privacy rights.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Email</h3>
          <p className='p'>
            We will only use your e-mail address to contact you with our latest
            news, information about our services and special offers. Your e-mail
            address will be used solely by SingleDebt and its associated
            companies and will not be sold or passed to any other third party.
            We sometimes employ other companies to perform functions on our
            behalf in maintaining and updating our website and e-mail list and
            providing assistance by sending e-mails on our behalf. They have
            access to the personal information needed to perform these functions
            only and may not use it for any other purposes. All our email
            communication offers an “opt-out” feature that allows you to remove
            your email address from mailing list at any time. You can always
            re-enter it when you want to start receiving information from us
            again.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Recording Of Calls And Live Chat Conversations</h3>
          <p className='p'>
            For training purposes, any calls with us and conversations using
            Live Chat will be recorded and may be monitored.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Cookies</h3>
          <p className='p'>
            <strong>Suggested text:</strong> If you request a password reset,
            your IP address will be in
          </p>
          <p className='p'>
            We also collect information through the use of “cookies”. A “cookie”
            is a piece of information sent via your Internet browser and stored
            on your local hard drive. Some cookies are deleted when you shut
            down your browser but others are stored for longer and will help to
            identify you, or information about you, the next time you log on to
            a website. Cookies do no harm in themselves, but you can choose to
            accept or reject them by changing the settings on your browser.
          </p>
          <p className='p'>
            If you do nothing other than read pages or download information
            while using this web site, we will capture and store information
            about your visit. This information will not identify you; it relates
            to:
          </p>
          <ul className='ul'>
            <li className='li'>
              {" "}
              The Internet domain (e.g. www.SingleDebt.in) and IP address from
              which you access the web site
            </li>
            <li className='li'>
              {" "}
              The type of browser (Internet Explorer or Netscape) and operating
              system (Windows, UNIX) you use
            </li>
            <li className='li'> The date and time of your visit</li>
            <li className='li'>The pages you visit</li>
            <li className='li'>
              The address of the web site from which you linked to us (if
              applicable).
            </li>
          </ul>
          <p className='p'>
            We use this information to make each visit more rewarding, and to
            provide us with information to help improve our service. We do not
            know (and do not want to know) the identities of people who visit us
            in this way.
          </p>

          <p className='p'>The table below explains the cookies we use and why.</p>

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Cookie</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">More Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Analytics</td>
                  <td>
                    These cookies are used to collect information about how
                    visitors use our site. We use the information to compile
                    reports and to help us improve the site. The cookies collect
                    information in an anonymous form, including the number of
                    visitors to the site, where visitors have come to the site
                    from and the pages they visited.
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Site cookie acceptance</td>
                  <td>
                    This cookie is used to record if a user has accepted the use
                    of cookies on the website.
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Online notification form cookie</td>
                  <td>
                    This cookie is essential for the online application process.
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Links to Other Websites</h3>
          <p className='p'>
            This website may contain “links” to other websites. We make every
            effort to only link to sites that share our high standards of
            privacy and service. However, SingleDebt cannot be responsible for
            the content on any website we link to and the privacy policies on
            those websites may be different to ours.
          </p>
        </section>

        <section className="section mb-4">
          <h3 className='h3'>Contact Us</h3>
          <p className='p'>
            If you have any questions about SingleDebt, online privacy policies
            or procedures, please email us at:{" "}
            <a href="mailto:info@SingleDebt.in">info@SingleDebt.in</a>.
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
