import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RolesTable from "./RolesTable";

function RolesTab() {
  const [tabValue, setTabValue] = useState("1");

  const [employees, setEmployees] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jwt/getallusers");
      const { data } = res;

      const newStudents = [];
      const newFaculty = [];

      data.forEach((user) => {
        if (user.isStaff) {
          newFaculty.push(user);
        } else {
          newStudents.push(user);
        }
      });
      console.log({ data });

      console.log({ newStudents, newFaculty });

      setStudents(newStudents);
      setFaculty(newFaculty);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jwt/getallemployee");
      const { data } = res;
      setEmployees(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUsers();
    getEmployees();
  }, []);

  return (
    <>
      <div className="userm-tab-container">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              aria-label="Tabs example"
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="All" value="1" />
              <Tab label="Student" value="2" />
              {/* <Tab label="Faculty" value="3" /> */}
              <Tab label="Employee" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <RolesTable users={[...students, ...faculty, ...employees]} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <RolesTable users={students} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <RolesTable users={faculty} />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            <RolesTable users={employees} />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
}

export default RolesTab;
