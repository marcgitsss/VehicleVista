import React from 'react';
import './UserSideBar.css';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function UserSidebar({ activeMenuItem }) {
  return (
    <div className="user-sidebar">
      <ul className="user-sidebar-menu">
        <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
          <DashboardOutlinedIcon sx={{ color: "black", marginRight: "1.5rem" }} /> Homepage
        </li>
        <li className={activeMenuItem === "ApplicationList" ? "active" : ""}>
          <FormatListBulletedOutlinedIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Verify OR/CR <br /> and License
        </li>
        <li className={activeMenuItem === "Configuration" ? "active" : ""}>
          <SettingsOutlinedIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Verify Proof <br /> of Payment
        </li>
        <li className={activeMenuItem === "Configuration" ? "active" : ""}>
          <SettingsOutlinedIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Aprove <br /> Applications
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;
