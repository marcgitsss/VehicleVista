import "./AdminSidebar.css";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar-menu">
        <li className={currentPath === "/admin-dashboard" ? "active" : ""}>
          <Link to="/admin-dashboard">
            <DashboardOutlinedIcon
              sx={{ color: "black", marginRight: "1.5rem" }}
            />{" "}
            Dashboard
          </Link>
        </li>
        <li className={currentPath === "/application-list" ? "active" : ""}>
          <Link to="/application-list">
            <FormatListBulletedOutlinedIcon
              sx={{ color: "black", marginRight: "1.5rem" }}
            />{" "}
            Application List
          </Link>
        </li>
        <li className={currentPath === "/configuration" ? "active" : ""}>
          <Link to="/configuration">
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
