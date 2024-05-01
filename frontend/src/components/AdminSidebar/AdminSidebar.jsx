import React from 'react';
import './AdminSidebar.css';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function AdminSidebar({ activeMenuItem }) {
  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar-menu">
        <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
          <DashboardOutlinedIcon sx={{ color: "black", marginRight: "1.5rem" }} /> Dashboard
        </li>
        <li className={activeMenuItem === "ApplicationList" ? "active" : ""}>
          <FormatListBulletedOutlinedIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Application List
        </li>
        <li className={activeMenuItem === "Configuration" ? "active" : ""}>
          <SettingsOutlinedIcon sx={{ color: "black", marginRight: "1.5rem"}} /> Configuration
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
