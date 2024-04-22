import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    Paper,
    TableRow,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import PageviewIcon from "@mui/icons-material/Pageview";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import Button from "@mui/material/Button";
  
  import { useState } from "react";
  import "./ApprovedTable.css";
  
  function ApprovedTable() {
    const [userFilter, setUserFilter] = useState();
    const [applicationTypeFilter, setApplicationTypeFilter] = useState();
    const [dateFilter, setDateFilter] = useState();
  
    const handleUserFilterChange = (event) => {
      setUserFilter(event.target.value);
    };
    const handleApplicationTypeFilterChange = (event) => {
      setApplicationTypeFilter(event.target.value);
    };
    const handleDateFitlerChange = (event) => {
      setDateFilter(event.target.value);
    };
  
    const tableData = [
      {
        id: 1,
        name: "Marc",
        userType: "Student",
        applicationType: "New",
        grade: 1,
        idNumber: "127-70-232-121",
        contactNumber: "55-172-3559",
        dateSubmitted: "5/20/2023",
        vehicleType: "4",
      },
      {
        id: 2,
        name: "Garrot",
        userType: "Student",
        applicationType: "New",
        grade: 2,
        idNumber: "114-217-149-121",
        contactNumber: "72-696-8812",
        dateSubmitted: "12/4/2023",
        vehicleType: "3",
      },
      {
        id: 3,
        name: "Angelina",
        userType: "Student",
        applicationType: "Renewal",
        grade: 3,
        idNumber: "223-141-111-107",
        contactNumber: "45-351-8496",
        dateSubmitted: "8/18/2023",
        vehicleType: "2",
      },
      {
        id: 4,
        name: "Tallou",
        userType: "Student",
        applicationType: "New",
        grade: 4,
        idNumber: "147-115-36-31",
        contactNumber: "51-201-2189",
        dateSubmitted: "4/25/2023",
        vehicleType: "1",
      },
      {
        id: 5,
        name: "Jackie",
        userType: "Student",
        applicationType: "Renewal",
        grade: 5,
        idNumber: "205-159-152-2",
        contactNumber: "89-560-7272",
        dateSubmitted: "11/6/2023",
        vehicleType: "4",
      },
      {
        id: 6,
        name: "Kendall",
        userType: "Student",
        applicationType: "New",
        grade: 6,
        idNumber: "134-146-38-117",
        contactNumber: "81-411-5206",
        dateSubmitted: "2/3/2024",
        vehicleType: "2",
      },
      {
        id: 7,
        name: "Wilma",
        userType: "Student",
        applicationType: "Renewal",
        grade: 7,
        idNumber: "203-166-148-119",
        contactNumber: "69-887-5246",
        dateSubmitted: "7/7/2023",
        vehicleType: "1",
      },
      {
        id: 8,
        name: "Rivi",
        userType: "Student",
        applicationType: "New",
        grade: 8,
        idNumber: "173-115-17-225",
        contactNumber: "28-949-3471",
        dateSubmitted: "6/9/2023",
        vehicleType: "1",
      },
      {
        id: 9,
        name: "Goddart",
        userType: "Student",
        applicationType: "Renewal",
        grade: 9,
        idNumber: "214-241-247-56",
        contactNumber: "49-102-7337",
        dateSubmitted: "10/10/2023",
        vehicleType: "3",
      },
      {
        id: 10,
        name: "Lucienne",
        userType: "Student",
        applicationType: "New",
        grade: 10,
        idNumber: "175-68-246-93",
        contactNumber: "81-410-2809",
        dateSubmitted: "10/4/2023",
        vehicleType: "1",
      },
    ];
    return (
      <>
        {/* Menu */}
        <div className="filterOptions">
          {/* Users Filter */}
          <div>
            <h2>Select User</h2>
            <FormControl fullWidth size="small">
              <InputLabel id="user-filter-select-label">Select Users</InputLabel>
              <Select
                labelId="user-filter-select-label"
                id="user-filter-select"
                value={userFilter}
                label="Age"
                onChange={handleUserFilterChange}
                sx={{ width: "150px", padding: '0' }}
              >
                <MenuItem value={10}>Pam</MenuItem>
                <MenuItem value={20}>Jim</MenuItem>
                <MenuItem value={30}>Kevin</MenuItem>
              </Select>
            </FormControl>
          </div>
  
          {/* Application Type Filter */}
          <div>
            <h2>Select Type</h2>
            <FormControl fullWidth size="small">
              <InputLabel id="application-type-select-label">
                Application Type
              </InputLabel>
              <Select
                labelId="application-type-select-label"
                id="application-type-select"
                value={applicationTypeFilter}
                label="Age"
                onChange={handleApplicationTypeFilterChange}
                sx={{ width: "180px" }}
              >
                <MenuItem value={10}>New</MenuItem>
                <MenuItem value={20}>Renewal</MenuItem>
              </Select>
            </FormControl>
          </div>
  
          {/* Date Filter */}
          <div>
            <h2>Select Date</h2>
            <FormControl fullWidth size="small">
              <InputLabel id="date-select-label">January 1, 2024</InputLabel>
              <Select
                labelId="date-select-label"
                id="date-select"
                value={dateFilter}
                label="Age"
                onChange={handleDateFitlerChange}
                sx={{ width: "180px" }}
              >
                <MenuItem value={10}>January 1, 2024</MenuItem>
                <MenuItem value={20}>January 2, 2024</MenuItem>
              </Select>
            </FormControl>
          </div>
  
          {/* Button */}
          <div className="apply-button">
            <Button variant="contained">Apply</Button>
          </div>
        </div>
  
        {/* Table */}
        <TableContainer component={Paper}>
          <Table aria-label="pending table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgb(255 236 160)" }}>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  #
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  User Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Application Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Grade/Year
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  ID Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Contact Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Date Submitted
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Vehicle Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.userType}</TableCell>
                  <TableCell align="center">{row.applicationType}</TableCell>
                  <TableCell align="center">{row.grade}</TableCell>
                  <TableCell align="center">{row.idNumber}</TableCell>
                  <TableCell align="center">{row.contactNumber}</TableCell>
                  <TableCell align="center">{row.dateSubmitted}</TableCell>
                  <TableCell align="center">{row.vehicleType}</TableCell>
                  <TableCell align="center">
                    <PageviewIcon style={{ color: "yellow" }} />
                    <CheckBoxIcon style={{ color: "green" }} />
                    <DeleteForeverIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  
  export default ApprovedTable;
  