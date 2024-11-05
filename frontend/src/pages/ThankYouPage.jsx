import React from 'react';
import Usernavbar from '../components/Usernavbar';

const ThankYouPage = () => {
    const mainDivStyle = {
        backgroundColor: "#ffffff", // White background for contrast
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
        textAlign: "center",
        maxWidth: "600px",
        margin: "auto", // Center the main div
    };

    const headerStyle = {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        marginBottom: '20px',
    };

    const paragraphStyle = {
        marginBottom: '20px',
        lineHeight: '1.6',
        fontSize: '16px',
    };

    const contactStyle = {
        fontWeight: 'bold',
        marginTop: '20px',
    };

    return (
        <>
            <Usernavbar />
            <div className="container p-2 py-4">
                <div className="bg">
                    <div className="herotext">
                        <h1 className='' style={{padding :'0 0 10px 0'}}>Thank You for Enrolling!</h1>
                    </div>
                </div>

                <div className="maindiv" style={mainDivStyle}>
                    <h1 style={headerStyle}>Thank You for Enrolling in Our DMP</h1>
                    <p style={paragraphStyle}>
                        Thank you for enrolling in our Debt Management Plan (DMP) to begin your journey towards becoming debt-free and improving your credit score.
                    </p>
                    <p style={paragraphStyle}>
                        One of our financial advisors will contact you shortly from the number <span style={contactStyle}>020 225678924</span>. Please ensure you’re available to discuss your financial situation so we can guide you through the next steps.
                    </p>
                    <p style={paragraphStyle}>
                        We’re here to support you every step of the way in achieving financial freedom!
                    </p>
                </div>
            </div>
        </>
    );
};

export default ThankYouPage;
