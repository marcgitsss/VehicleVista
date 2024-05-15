import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

function AppListTable({ applicants }) {
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter((x) => x.studentName === userFilter)
    );
  }, [userFilter]);

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter(
        (x) => new Date(x.datesubmitted) <= new Date(dateFilter)
      )
    );
  }, [dateFilter]);

  useEffect(() => {
    setUserOptions(applicants.map((x) => x.studentName));
    setFilteredApplicants(applicants);
  }, [applicants]);

  return (
    <>
      {/* Menu */}
      <div className="applist-options">
        {/* Users Filter */}
        <div>
          <FormControl fullWidth size="small">
            <InputLabel id="user-filter-select-label1">Select User</InputLabel>
            <Select
              labelId="user-filter-select-label1"
              id="user-filter-select1"
              label="user-filter"
              sx={{ width: "150px", padding: "0" }}
              defaultValue=""
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              {userOptions.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Date Filter */}
        <div className="applist-date">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="applist-apply-button">
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
            {filteredApplicants.map((row, index) => (
              <TableRow key={row.idNumber}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.studentName}</TableCell>
                <TableCell align="center">
                  {row.isStaff ? "Faculty" : "Student"}
                </TableCell>
                <TableCell align="center">{row.gradeLevel}</TableCell>
                <TableCell align="center">{row.idNumber}</TableCell>
                <TableCell align="center">{row.contactNumber}</TableCell>
                <TableCell align="center">
                  {new Date(row.datesubmitted).toLocaleDateString("en-PH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell align="center">{row.isFourWheel ? 4 : 2}</TableCell>
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

export default AppListTable;
