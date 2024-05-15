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
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

function Roles_Tab() {
  const tableData = [
    {
      name: "pete",
      role: "Admin",
      assignedOffice: "ETO",
      lastActive: "Today",
    },
    {
      name: "flop",
      role: "Admin",
      assignedOffice: "ETO",
      lastActive: "Today",
    },
    {
      name: "erin",
      role: "Admin",
      assignedOffice: "ETO",
      lastActive: "Today",
    },
  ];
  return (
    <>
      <div className="userm-tab-container">
        <div className="userm-overview">
          <Box component="section" className="userm-overview-box">
            <span>36</span>
            <span>Sticker Pricing</span>
          </Box>
          <Box component="section" className="userm-overview-box">
            <span>9</span>
            <span>Restricted</span>
          </Box>
          <Box component="section" className="userm-overview-box">
            <span>10</span>
            <span>Access Requests</span>
          </Box>
        </div>

        {/* Search */}
        <div className="userm-query">
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button 
            style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}
            variant="contained" 
            startIcon={<SwapVertIcon />}>
            Sort
          </Button>
        </div>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table aria-label="user table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgb(255 236 160)" }}>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Role
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Assigned Office
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Last Active
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.assignedOffice}</TableCell>
                  <TableCell align="center">{row.lastActive}</TableCell>
                  <TableCell align="center">
                    <MoreHorizIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Roles_Tab;
