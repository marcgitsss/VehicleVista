import React, { useEffect, useState } from 'react';
import ChooseUserTypeModal from '../vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import axios from 'axios';
import './user_homepage.css';

const UserAnnouncement = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [applications, setApplications] = useState({});
  const [date, setDate] = useState();
  const [email, setEmail] = useState('');

  // Decoding token
  useEffect(() => {
    const decodeJwt = async () => {
      if (token) {
        try {
          const response = await axios.post('http://localhost:8080/jwt/decode', null, {
            params: { token: token },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const decoded = response.data.payload;
          setEmail(decoded.sub);
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    decodeJwt();
  }, [token]);

  const clickSample = () => {
    alert("VehicleVista");
  };

  const handleRegisterButtonClick = () => {
    setIsModalOpen(true);
  };

  const isRegistrationDisabled = () => {
    if (Object.keys(applications).length === 0) {
      return false; // Allow registration if no applications exist
    }
    const currentDate = new Date();
    const expirationDate = new Date(applications.expirationDate);

    if(applications.approved === false){
      if (applications.rejected === true || expirationDate < currentDate) {
        return false; // Allow registration
      }else{
        return true;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/get-by-email/" + email
        );
        if (response.data) {
          console.log('asdasdasd', response.data);
          setApplications(response.data);
          setDate(response.data.datesubmitted);
          console.log(new Date(response.data.expirationDate)<new Date())
        }
      } catch (error) {
        console.error(error);
      }
      
    };
    fetchData();
  }, [email]);
  
  console.log('applications', applications);

  return (
    <section>
      <ChooseUserTypeModal isOpen={isModalOpen} toggleModal={setIsModalOpen} />

      <div className="userHomepageContainer">
        <div className="userHomepagebuttonContainer">
          <button className="statusButton">Status<br/><span style={{color: applications.approved ? "green" : "red"}}>{applications.approved ? "Active" : "InActive"}</span></button>
          <button className="infoButton">Info</button>
        </div>
        <div className="userHomepagebuttonContainer">
          <button className="registerButton" 
          onClick={handleRegisterButtonClick} 
          disabled={isRegistrationDisabled()}  
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
