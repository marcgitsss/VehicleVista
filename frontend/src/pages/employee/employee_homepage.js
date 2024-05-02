import React, { useState } from 'react';
import Header from '../../components/Navbar/UserHeader'; // Corrected import path for Header
import Footer from '../../components/Navbar/UserFooter'; // Corrected import path for Footer
import backgroundImage from '../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employee_homepage.css';


const EmployeeHomepage = () => {
  const [profile, setProfile] = useState("Profile");

  const clickSample = () => {
    alert("VehicleVista");
  };

  return (
    <div className='employeehomepage'>
      <div className='header'>
        <Header />
      </div>
      
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />
      <div className="employeecontainer">
        <div className="buttonContainer">
          <button className="profileButton" onClick={clickSample}>{profile}</button>
          <button className="dashboardButton" onClick={clickSample}>Dashboard</button>
        </div>
        <div className="contentContainer">
          <div className="employeefeatures">
            <span>Employee Features</span><br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeHomepage;
