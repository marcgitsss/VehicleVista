import React, { useState } from 'react';

import './user_homepage.css';

const UserAnnouncement = () => {
  const [activeStatus, setActiveStatus] = useState("Active");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");

  const clickSample = () => {
    alert("VehicleVista");
  };

  return (
    <section>
         
    <div className="userHomepageContainer">
      <div className="userHomepagebuttonContainer">
        <button className="statusButton" >Status</button>
        <button className="infoButton">Info</button>
      </div>
      <div className="userHomepagebuttonContainer">
        <button className="registerButton" onClick={clickSample}>Register</button>
        <button className="disclaimerButton" 
          >Disclaimer<br/>
          <div className="disclaimer">
            <span>{disclaimer}</span>
          </div>
        </button>
      </div>
      <div className="contentContainer">
        
      </div>
    </div>
   
    </section>
  );
};

export default UserAnnouncement;
