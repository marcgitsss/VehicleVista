import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Roles_Tab from "./Roles_Tab";
import Permissions_Tab from "./Permissions_Tab";

function UserManagement() {
  const [tabValue, setTabValue] = useState("1");

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        {/* Breadcrumbs Navigation */}
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ fontSize: "2em", marginTop: "1em" }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              style={{ color: "#8A252C" }}
            >
              Configuration
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              User Management
            </Link>
          </Breadcrumbs>
        </div>

        {/* Tabs */}
        <div>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList aria-label="Tabs example" onChange={handleTabChange}>
                <Tab label="Roles" value="1" />
                <Tab label="Permissions" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Roles_Tab />
            </TabPanel>
            <TabPanel value="2">
              <Permissions_Tab />
            </TabPanel>
          </TabContext>
        </div>
      </main>
    </>
  );
}

export default UserManagement;
