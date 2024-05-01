import React, { useState } from 'react';
import Header from './components/Navbar/UserHeader'; // Corrected import path for Header
import Footer from './components/Navbar/UserFooter'; // Corrected import path for Footer
import backgroundImage from './assets/SIABackground.png'; // Corrected import path for backgroundImage
import './components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './user_homepage.css';

const Homepage = () => {
  const [activeStatus, setActiveStatus] = useState("Active");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [profile, setProfile] = useState("Profile");

  const clickSample = () => {
    alert("VehicleVista");
  };

  return (
    <div className='homepage'>
      <div className='header'>
        <Header />
      </div>
      
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />
      <div className="container">
        <div className="buttonContainer">
          <button className="profileButton" onClick={clickSample}>{profile}</button>
          <button className="renewalButton" onClick={clickSample}>Register/Renewal</button>
        </div>
        <div className="contentContainer">
          <div className="disclaimer">
            <span>Disclaimer</span><br />
            <span>{disclaimer}</span>
          </div>
          <div className="status">
            <span>Status:</span><br />
            <span>{activeStatus}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;