import React from "react";
import "./AdminSidebar.css";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";

function AdminSidebar({ activeMenuItem }) {
  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar-menu">
        <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
          <DashboardOutlinedIcon
            sx={{ color: "black", marginRight: "1.5rem" }}
          />{" "}
          Dashboard
        </li>
        <li className={activeMenuItem === "ApplicationList" ? "active" : ""}>
          <Link to={"/application-list"}>
            <FormatListBulletedOutlinedIcon
              sx={{ color: "black", marginRight: "1.5rem" }}
            />{" "}
            Application List
          </Link>
        </li>
        <li className={activeMenuItem === "Configuration" ? "active" : ""}>
          <Link to={'/'}>
            <SettingsOutlinedIcon
              sx={{ color: "black", marginRight: "1.5rem" }}
            />{" "}
            Configuration
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
