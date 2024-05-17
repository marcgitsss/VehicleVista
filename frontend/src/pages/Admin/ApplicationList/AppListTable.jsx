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
  Snackbar,
} from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import ViewApplicantModal from "./modals/ViewApplicantModal";
import DeleteApplicantModal from "./modals/DeleteApplicantModal";
import axios from "axios";

function AppListTable({ applicants, currentTab }) {
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [userOptions, setUserOptions] = useState([]);

  const [openViewApplicantModal, setOpenViewApplicantModal] = useState(false);
  const [openDeleteApplicantModal, setOpenDeleteApplicantModal] =
    useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter((x) => x.studentName === userFilter)
    );
  }, [userFilter, applicants]);

  useEffect(() => {
    setFilteredApplicants(
      applicants.filter(
        (x) => new Date(x.datesubmitted) <= new Date(dateFilter)
      )
    );
  }, [dateFilter, applicants]);

  useEffect(() => {
    setUserOptions(applicants.map((x) => x.studentName));
    setFilteredApplicants(applicants);
  }, [applicants]);

  const approveApplicant = async (email) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/applicants/approveApplicant/${email}`
      );

      setSnackbarMessage("Successfully Approved Application");
      setSnackbarOpen(true);

      setFilteredApplicants(
        filteredApplicants.filter((x) => x.email !== email)
      );

      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const denieApplicant = async (email, message) => {
    try {
      await axios.post(
        `http://localhost:8080/applicants/rejectApplicant`,
        {
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("Successfully Denied Application");
      setSnackbarOpen(true);
      setFilteredApplicants(
        filteredApplicants.filter((x) => x.email !== email)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

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
              MenuProps={{
                disableScrollLock: true,
              }}
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              {userOptions.map((user) => (
                <MenuItem key={`${user}${new Date()}`} value={user}>
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
              <TableRow key={row.applicantid}>
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
                  <PageviewIcon
                    className="admin-icon"
                    style={{ color: "yellow" }}
                    fontSize="large"
                    onClick={() => {
                      setSelectedApplicant(row);
                      setOpenViewApplicantModal(true);
                    }}
                  />

                  {currentTab === "pending" && (
                    <>
                      <CheckBoxIcon
                        className="admin-icon"
                        style={{ color: "green" }}
                        fontSize="large"
                        onClick={() => {
                          approveApplicant(row.email);
                        }}
                      />
                      <DeleteForeverIcon
                        className="admin-icon"
                        style={{ color: "red" }}
                        fontSize="large"
                        onClick={() => {
                          setSelectedApplicant(row);
                          setOpenDeleteApplicantModal(true);
                        }}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      <ViewApplicantModal
        isOpen={openViewApplicantModal}
        setIsOpen={setOpenViewApplicantModal}
        applicant={selectedApplicant}
      />

      <DeleteApplicantModal
        isOpen={openDeleteApplicantModal}
        setIsOpen={setOpenDeleteApplicantModal}
        applicant={selectedApplicant}
        denieApplicant={denieApplicant}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}

export default AppListTable;
