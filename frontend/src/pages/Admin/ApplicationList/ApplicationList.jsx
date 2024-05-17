import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AppListTable from "./AppListTable";
import axios from "axios";

function ApplicationList() {
  const [tabValue, setTabValue] = useState("1");
  const [allApplicants, setAllApplicants] = useState([]);
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [approvedApplicants, setApprovedApplicants] = useState([]);

  const getAllApplicant = async () => {
    try {
      const res = await axios.get("http://localhost:8080/applicants/all");
      setAllApplicants(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllApplicant();
  }, []);

  useEffect(() => {
    let pendingList = [];
    let approvedList = [];

    allApplicants.forEach((applicant) => {
      if (applicant.approved) {
        approvedList.push(applicant);
      } else {
        pendingList.push(applicant);
      }
    });
    setPendingApplicants(pendingList);
    setApprovedApplicants(approvedList);
    console.log("allApplicants", allApplicants);
  }, [allApplicants]);

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        <div className="admin-title">
          <h1>Application List</h1>
        </div>

        {/* Tabs */}
        <div>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="Tabs example"
                onChange={(e, newValue) => setTabValue(newValue)}
              >
                <Tab label="Pending" value="1" />
                <Tab label="Approved" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AppListTable
                applicants={pendingApplicants}
                currentTab="pending"
              />
            </TabPanel>
            <TabPanel value="2">
              <AppListTable
                applicants={approvedApplicants}
                currentTab="approved"
              />
            </TabPanel>
          </TabContext>
        </div>
      </main>
    </>
  );
}

export default ApplicationList;
