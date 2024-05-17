import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Box from "@mui/material/Box";
import SellIcon from "@mui/icons-material/Sell";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

function Configuration() {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ fontSize: "2em", marginTop: "1em" }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/configuration"
              style={{ color: "#8A252C" }}
            >
              Configuration
            </Link>
          </Breadcrumbs>
        </div>

        {/* Links */}
        <div className="/config-links">
          <Link to="/sticker-pricing">
            <Box component="section" className="config-link-box">
              <SellIcon />
              <span>Sticker Pricing</span>
            </Box>
          </Link>

          <Link to="/user-management">
            <Box component="section" className="config-link-box">
              <PersonIcon />
              <span>User Management</span>
            </Box>
          </Link>

          <Link to="/account-expiration">
            <Box component="section" className="config-link-box">
              <WarningIcon />
              <span>Account Expiration</span>
            </Box>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Configuration;
