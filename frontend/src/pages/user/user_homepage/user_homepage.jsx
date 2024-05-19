import React, { useEffect, useState } from 'react';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import backgroundImage from '../../../assets/HP_Background.jpg';
import '../../../components/Navbar/UserFooter.css';
import './user_homepage.css';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import UserAnnouncement from './announcement';
import UserProfilePage from '../user_profile/user_profile/user_profilepage';
import UserStatus from './UserStatus';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // Prevent back button functionality
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/homepage"); // Navigate to homepage again
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);
  })
  
  useEffect(() => {
    sessionStorage.setItem('lastLocation', '/homepage'); // Store the homepage location in sessionStorage
  }, []);

  useEffect(() => {
    try {
      const decoded = jwtDecode(token, { header: true });
      setDecodedToken(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error (e.g., redirect to login page)
    }
  }, [token, navigate]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const renderComponent = () => {
    switch (activeMenuItem) {
      case "Home":
        return <UserAnnouncement />;
      case "Registration":
        return <UserStatus />;
      case "Profile":
        return <UserProfilePage />;
      default:
        return <UserAnnouncement />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='homepage' style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <Header />
      </div>

      <div className='student_sidebar'>
        <StudentSidebar activeMenuItem={activeMenuItem} onMenuItemClick={handleMenuItemClick} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}/>
      </div>
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />
      <div className="userHomepageContainer" >
        {renderComponent()}
      </div>

      <div style={{zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
};

export default UserHomepage;
