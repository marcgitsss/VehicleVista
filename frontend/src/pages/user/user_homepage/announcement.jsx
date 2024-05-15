import React, { useEffect, useState } from 'react';
import ChooseUserTypeModal from '../vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import axios from 'axios';
import './user_homepage.css';

const UserAnnouncement = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility

  const clickSample = () => {
    alert("VehicleVista");
  };

  const handleRegisterButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the "Register" button is clicked
  };

  useEffect(() => {
    // Fetch data from API endpoint using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('your_api_endpoint_here');
        // Assuming the response contains data for activeStatus, disclaimer, and info
        setActiveStatus(response.data.activeStatus);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <section>
      {/* Modal for choosing user type */}
      <ChooseUserTypeModal isOpen={isModalOpen} toggleModal={setIsModalOpen} />

      <div className="userHomepageContainer">
        <div className="userHomepagebuttonContainer">
          <button className="statusButton" >Status<br/><span>{activeStatus}</span></button>
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
