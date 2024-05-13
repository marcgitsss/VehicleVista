import React from 'react';
import './StudentSidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';


function StudentSidebar({ activeMenuItem }) {
  return (
    <div className="student-sidebar">
      <ul className="student-sidebar-menu">
        <li className={activeMenuItem === "Home" ? "active" : ""}>
          <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} /> Homepage
        </li>
        <li className={activeMenuItem === "Registration" ? "active" : ""}>
           <TaskIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Registration/Renewal 
        </li>
        <li className={activeMenuItem === "Profile" ? "active" : ""}>
          <PersonIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Profile
        </li>
        <li className={activeMenuItem === "Payment" ? "active" : ""}>
          <PaymentIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Payment
        </li>
      </ul>
    </div>
  );
}

export default StudentSidebar;
