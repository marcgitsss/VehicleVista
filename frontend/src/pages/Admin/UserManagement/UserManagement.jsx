import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import RolesTab from "./RolesTab";
import PermissionsTab from "./PermissionsTab";

function UserManagement() {
  const [tabValue, setTabValue] = useState("1");

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        {/* Breadcrumbs Navigation */}
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
            <span>User Management</span>
          </Breadcrumbs>
        </div>

        {/* Tabs */}
        <div>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="Tabs example"
                onChange={(e, newValue) => setTabValue(newValue)}
              >
                <Tab label="Roles" value="1" />
                <Tab label="Permissions" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <RolesTab />
            </TabPanel>
            <TabPanel value="2">
              <PermissionsTab />
            </TabPanel>
          </TabContext>
        </div>
      </main>
    </>
  );
}

export default UserManagement;
