import React, { useEffect, useState } from 'react';
import ChooseUserTypeModal from '../vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './user_homepage.css';

const UserAnnouncement = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility
  const token = localStorage.getItem("token");
  const [applications, setApplications] = useState({});
  const [date, setDate] = useState();
  const decondedToken = jwtDecode(token);
  const email = decondedToken.sub;

  const clickSample = () => {
    alert("VehicleVista");
  };

  const handleRegisterButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the "Register" button is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/" + email
        );
        if (response.data) {
          console.log('asdasdasd',response.data);
          setApplications(response.data);
          setDate(response.data.datesubmitted);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log('applications',applications)
  return (
    <section>
      {/* Modal for choosing user type */}
      <ChooseUserTypeModal isOpen={isModalOpen} toggleModal={setIsModalOpen} />

      <div className="userHomepageContainer">
        <div className="userHomepagebuttonContainer">
          <button className="statusButton" >Status<br/><span style={{color: applications.approved ? "green" : "red"}}>{applications.approved ? "Active" : "InActive"}</span></button>
          <button className="infoButton">Info</button>
        </div>
        <div className="userHomepagebuttonContainer">
          <button className="registerButton" 
          onClick={handleRegisterButtonClick} 
          disabled={Object.keys(applications).length !== 0}  
          title={Object.keys(applications).length !== 0 ? "Cannot register while applications is still pending" : ""}>Register</button>
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
