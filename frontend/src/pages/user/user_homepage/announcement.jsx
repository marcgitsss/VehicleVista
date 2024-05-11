import React, { useState } from 'react';
import ChooseUserTypeModal from '../vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';

import './user_homepage.css';

const UserAnnouncement = () => {
  const [activeStatus, setActiveStatus] = useState("Active");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility

  const clickSample = () => {
    alert("VehicleVista");
  };

  const handleRegisterButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the "Register" button is clicked
  };

  return (
    <section>
      {/* Modal for choosing user type */}
      <ChooseUserTypeModal isOpen={isModalOpen} toggleModal={setIsModalOpen} />

      <div className="userHomepageContainer">
        <div className="userHomepagebuttonContainer">
          <button className="statusButton" >Status</button>
          <button className="infoButton">Info</button>
        </div>
        <div className="userHomepagebuttonContainer">
          <button className="registerButton" onClick={handleRegisterButtonClick}>Register</button>
          <button className="disclaimerButton">
            Disclaimer<br/>
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
