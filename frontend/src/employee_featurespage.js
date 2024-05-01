import React, { useState } from 'react';
import Header from './components/Navbar/UserHeader'; // Corrected import path for Header
import Footer from './components/Navbar/UserFooter'; // Corrected import path for Footer
import backgroundImage from './assets/SIABackground.png'; // Corrected import path for backgroundImage
import './components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employee_featurespage.css';


const EmployeeFeaturesPage = () => {
  const [approvedapplications, setProfile] = useState("Approved Applications");

  const clickSample = () => {
    alert("VehicleVista");
  };

  return (
    <div className='employeefeaturespage'>
      <div className='header'>
        <Header />
      </div>
      
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />
      <div className="container">
        <div className="buttonContainer">
          <button className="approvedapplicationsButton" onClick={clickSample}>{approvedapplications}</button>
          <button className="verifydocumentsButton" onClick={clickSample}>VerifyOR/CR and License</button>
        </div>
        <div className="contentContainer">
          <div className="verifyproofofpayment">
            <span>Verify Proof of Payment</span><br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeFeaturesPage;
