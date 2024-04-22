import { Container } from "@mui/material";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { useState } from "react";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import "./ApplicationList_Admin.css";
import PendingTable from "./PendingTable/PendingTable";
import ApprovedTable from "./ApprovedTable/ApprovedTable";

function ApplicationList_Admin() {
  const [tabValue, setTabValue] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="container">
        {/* Header */}
        <div className="header">
          <h1>Application List</h1>
        </div>

        {/* Tabs */}
        <div>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList aria-label="Tabs example" onChange={handleTabChange}>
                <Tab label="Pending" value="1" />
                <Tab label="Approved" value="2" />
                <Tab label="Denied" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PendingTable />
            </TabPanel>
            <TabPanel value="2">
              <ApprovedTable />
            </TabPanel>
            <TabPanel value="3">Panel Three</TabPanel>
          </TabContext>
        </div>

        {/* Table */}
        <div></div>
      </main>
    </>
  );
}

export default ApplicationList_Admin;
