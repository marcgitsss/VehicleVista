import React, { useState } from 'react';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import backgroundImage from '../../../assets/HP_Background.jpg';
import '../../../components/Navbar/UserFooter.css';
import './user_homepage.css';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import UserAnnouncement from './announcement';

const UserHomepage = () => {
  const [activeStatus, setActiveStatus] = useState("Active");
  const [disclaimer, setDisclaimer] = useState("Release of stickers on Monday!");
  const [info, setInfo] = useState("Info Here");

  const clickSample = () => {
    alert("VehicleVista");
  };

  return (
    <section>
    <div className='homepage'>
      <Header />
    </div>

    <div className='student_sidebar'>
        <StudentSidebar/>
    </div>
    <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />      
      <div className="userHomepageContainer">
        <UserAnnouncement/>
      </div>
    
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Footer />
    </div>
    </section>
  );
};

export default UserHomepage;
