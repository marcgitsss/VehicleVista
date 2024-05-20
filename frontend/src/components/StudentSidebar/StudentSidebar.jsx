import React from 'react';
import './StudentSidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';

function StudentSidebar({ activeMenuItem, onMenuItemClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize isMobile state based on initial viewport width
  const [Open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!Open);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile state when viewport size changes
    };

    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    };
  }, []);

  return (
<>
{isMobile ? (
  <>

    <Button sx={{ color: "black", marginLeft: "0.5rem", marginTop: "5rem", marginBottom: "0rem", zIndex: "1000", position: "fixed" }} onClick={handleClick}><FaBars /></Button>
    {Open ?
      <div className="student-sidebar">
      <ul className="student-sidebar-menu">
        <li className={activeMenuItem === "Home" ? "active" : ""} onClick={() => onMenuItemClick("Home")}>
          <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} /> Homepage
        </li>
        <li className={activeMenuItem === "Registration" ? "active" : ""} onClick={() => onMenuItemClick("Registration")}>
           <TaskIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Registration/<br />Renewal 
        </li>
        <li className={activeMenuItem === "Profile" ? "active" : ""} onClick={() => onMenuItemClick("Profile")}>
          <PersonIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Profile
        </li>
      </ul>
    </div>: null}
  </>
) : (
  <>
    <div className="student-sidebar">
      <ul className="student-sidebar-menu">
        <li className={activeMenuItem === "Home" ? "active" : ""} onClick={() => onMenuItemClick("Home")}>
          <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} /> Homepage
        </li>
        <li className={activeMenuItem === "Registration" ? "active" : ""} onClick={() => onMenuItemClick("Registration")}>
           <TaskIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Registration/<br />Renewal 
        </li>
        <li className={activeMenuItem === "Profile" ? "active" : ""} onClick={() => onMenuItemClick("Profile")}>
          <PersonIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Profile
        </li>
      </ul>
    </div>
  </>
)}
</>
  );
}
export default StudentSidebar;
