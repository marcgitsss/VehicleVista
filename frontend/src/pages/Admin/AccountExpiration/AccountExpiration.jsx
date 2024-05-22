import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Snackbar } from "@mui/material";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";

function AccountExpiration() {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [sem, setSem] = useState("");

  const [currentSem, setCurrentSem] = useState("");
  const [currentSY, setCurrentSY] = useState("");
  const [studentExpiry, setStudentExpiry] = useState("");
  const [staffExpiry, setStaffExpiry] = useState("");

  const [inputDisabled, setInputDisabled] = useState(false);

  // Generate school years with the desired format
  const schoolYearsOption = Array.from({ length: 16 }, (v, i) => {
    const startYear = i + 2020;
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getExpirations();
  }, [snackbarOpen]);

  const onCancel = () => {
    setType("");
    setDate("");
    setSchoolYear("");
    setSem("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (date === "") return;

    console.log(type);
    if (type === "faculty") {
      await axios.post(
        "http://localhost:8080/config/setStaffGlobalExpiry", null,
        {
          params:{
            expirationDate: date,
          }
          
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else if (type === "faculty") {
      await axios.post(
        "http://localhost:8080/config/setStudentGlobalExpiry", null,
        {
          params:{
            expirationDate: date,
          }
          
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
    
    await axios.post(
      "http://localhost:8080/config/set-semester",null,
      {
        params:{
          semester: sem,
        }
        
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await axios.post(
      "http://localhost:8080/config/set-schoolyear",
      {
        schoolyear: schoolYear,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    getExpirations();
    setSnackbarMessage("Successfully Updated Account Expiration");
    setSnackbarOpen(true);

    setDate(new Date())
    setSchoolYear('')
    setSem('')
    setType(0)

  };

  

  const getExpirations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/config/get-expiration");
      setStaffExpiry(res.data.staffExpirationDate);
      setStudentExpiry(res.data.studentExpirationDate);
      setCurrentSem(res.data.semester);
      setCurrentSY(res.data.schoolYear);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getExpirations();
  }, []);

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
            <span>Account Expiration</span>
          </Breadcrumbs>
        </div>

        {/* Some Text */}
        <div className="accexp-info">

        </div>

        <div className="accexp-input-container">
          <Box
            className="accexp-input-group"
            component="form"
            onSubmit={onSubmit}
          >
            <div className="accexp-input-header">
              <span>Set Expiration</span>
              <EditIcon
                onClick={() => setInputDisabled(!inputDisabled)}
                className="admin-icon"
              />
            </div>

            <div className="accexp-input">
              <label htmlFor="type">Type</label>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">type</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={type}
                  label="Age"
                  onChange={(e) => setType(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  required
                  disabled={inputDisabled}
                >
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="accexp-input">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                disabled={inputDisabled}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="accexp-input">
              <label htmlFor="type">School Year</label>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">year</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Age"
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  required
                  disabled={inputDisabled}
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                >
                  {schoolYearsOption.map((sy) => (
                    <MenuItem key={sy} value={sy}>
                      {sy}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="accexp-input">
              <label htmlFor="type">Sem</label>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">sem</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Age"
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  required
                  disabled={inputDisabled}
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                >
                  <MenuItem value="First Sem">1st Sem</MenuItem>
                  <MenuItem value="Second Sem">2nd Sem</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="accexp-buttons">
              <Button
                style={{ backgroundColor: "#cccccc", color: "#333333" }}
                variant="contained"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "#8A252C", color: "white" }}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Box>

          <Box className="accexp-current-set-group">
            <div className="accexp-current-set-header">Current Set</div>

            <div className="accexp-current-set-info">
              <div>
                <span>School Year: </span>
                {currentSY}
              </div>
              <div>
                <span>Semester: </span>
                {currentSem}
              </div>

              <div>
                <span>Faculty: </span>
                {new Date(staffExpiry).toLocaleDateString("en-PH", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
              <div>
                <span>Student: </span>
                {new Date(studentExpiry).toLocaleDateString("en-PH", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          </Box>
        </div>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </main>
    </>
  );
}

export default AccountExpiration;
