import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function StickerPricing() {
  const [facultyDisabled, setFacultyDisabled] = useState(true);
  const [studentDisabled, setStudentDisabled] = useState(true);

  const [staffFourWheelParking, setStaffFourWheelParking] = useState(0);
  const [staffFourWheelPickup, setStaffFourWheelPickup] = useState(0);
  const [staffTwoWheelParking, setStaffTwoWheelParking] = useState(0);
  const [staffTwoWheelPickup, setStaffTwoWheelPickup] = useState(0);

  const [studentFourWheelParking, setStudentFourWheelParking] = useState(0);
  const [studentFourWheelPickup, setStudentFourWheelPickup] = useState(0);
  const [studentTwoWheelParking, setStudentTwoWheelParking] = useState(0);
  const [studentTwoWheelPickup, setStudentTwoWheelPickup] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showFacultySave, setShowFacultySave] = useState(false);
  const [showStudentSave, setShowStudentSave] = useState(false);


  const saveStudentPrices = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/prices/update-student-prices",
        {
          studentFourWheelParking,
          studentFourWheelPickup,
          studentTwoWheelParking,
          studentTwoWheelPickup,
        }
      );
      console.log("res", res);

      setSnackbarMessage("Successfully Updated Sticker Pricing");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const saveFacultyPrices = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/prices/update-staff-prices",
        {
          staffFourWheelParking,
          staffFourWheelPickup,
          staffTwoWheelParking,
          staffTwoWheelPickup,
        }
      );
      
      console.log("res", res);

      setSnackbarMessage("Successfully Updated Sticker Pricing");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrices = async () => {
    try {
      const res = await axios.get("http://localhost:8080/prices/get-prices");
      const { data } = res;
      console.log("data", data);
      setStaffFourWheelParking(data.staffFourWheelParking);
      setStaffFourWheelPickup(data.staffFourWheelPickup);
      setStaffTwoWheelParking(data.staffTwoWheelParking);
      setStaffTwoWheelPickup(data.staffTwoWheelPickup);

      setStudentFourWheelParking(data.studentFourWheelParking);
      setStudentFourWheelPickup(data.studentFourWheelPickup);
      setStudentTwoWheelParking(data.studentTwoWheelParking);
      setStudentTwoWheelPickup(data.studentTwoWheelPickup);
      console.log("called");
      setShowFacultySave(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPrices();
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
            <span>Sticker Pricing</span>
          </Breadcrumbs>
        </div>

        {/* Some Text */}
        <div className="sticker-info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at massa
          non libero suscipit placerat a non ipsum. Aenean tempor nec enim vel
          feugiat. Pellentesque a malesuada dolor. Nullam malesuada scelerisque
          elit in sagittis. Etiam bibendum lobortis sapien sit amet consequat.
          Pellentesque vitae congue neque, vitae finibus nisl. Vivamus turpis
          diam, sodales quis venenatis
        </div>

        <div className="sticker-input-container">
          {/* Faculty */}
          <Box className="sticker-input-group">
            <div className="sticker-input-header">
              <span>Faculty</span>
              <EditIcon
                onClick={() => {
                  setFacultyDisabled(!facultyDisabled)
                  setShowFacultySave(!showFacultySave)
                }}
                className="admin-icon"
              />
            </div>

            <div className="sticker-input">
              <label htmlFor="4-wheel-parking">4 - Wheel Parking</label>
              <input
                type="number"
                name="4-wheel-parking"
                disabled={facultyDisabled}
                value={staffFourWheelParking}
                onChange={(e) => setStaffFourWheelParking(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="2-wheel-parking">2 - Wheel Parking</label>
              <input
                type="number"
                name="2-wheel-parking"
                disabled={facultyDisabled}
                value={staffTwoWheelParking}
                onChange={(e) => setStaffTwoWheelParking(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="4-wheel-pickup">4 - Wheel Pickup/Dropoff</label>
              <input
                type="number"
                name="4-wheel-pickup"
                disabled={facultyDisabled}
                value={staffFourWheelPickup}
                onChange={(e) => setStaffFourWheelPickup(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="2-wheel-pickup">2 - Wheel Pickup/Dropoff</label>
              <input
                type="number"
                name="2-wheel-pickup"
                disabled={facultyDisabled}
                value={staffTwoWheelPickup}
                onChange={(e) => setStaffTwoWheelPickup(e.target.value)}
              />
            </div>

            <div className="sticker-buttons">
                {showFacultySave?(
                  <>
                  <Button
                    style={{ backgroundColor: "#cccccc", color: "#333333" }}
                    variant="contained"
                    onClick={() => getPrices()}
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveFacultyPrices} variant="contained">
                    Save
                  </Button>
                  </>
                ):(<></>)}


              
            </div>
          </Box>
          {/* Student */}
          <Box className="sticker-input-group">
            <div className="sticker-input-header">
              <span>Student</span>
              <EditIcon
                onClick={() => {
                  setStudentDisabled(!studentDisabled)
                  setShowStudentSave(!showStudentSave)
                }}
                className="admin-icon"
              />
            </div>

            <div className="sticker-input">
              <label htmlFor="s-4-wheel-parking">4 - Wheel Parking</label>
              <input
                type="number"
                name="s-4-wheel-parking"
                disabled={studentDisabled}
                value={studentFourWheelParking}
                onChange={(e) => setStudentFourWheelParking(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="s-2-wheel-parking">2 - Wheel Parking</label>
              <input
                type="number"
                name="s-2-wheel-parking"
                disabled={studentDisabled}
                value={studentTwoWheelParking}
                onChange={(e) => setStudentTwoWheelParking(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="s-4-wheel-pickup">4 - Wheel Pickup/Dropoff</label>
              <input
                type="number"
                name="s-4-wheel-pickup"
                disabled={studentDisabled}
                value={studentFourWheelPickup}
                onChange={(e) => setStudentFourWheelPickup(e.target.value)}
              />
            </div>
            <div className="sticker-input">
              <label htmlFor="s-2-wheel-pickup">2 - Wheel Pickup/Dropoff</label>
              <input
                type="number"
                name="s-2-wheel-pickup"
                disabled={studentDisabled}
                value={studentTwoWheelPickup}
                onChange={(e) => setStudentTwoWheelPickup(e.target.value)}
              />
            </div>

            <div className="sticker-buttons">
                {showStudentSave? 
                  (<>
                  <Button
                    style={{ backgroundColor: "#cccccc", color: "#333333" }}
                    variant="contained"
                    onClick={() => {
                      
                      getPrices();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={saveStudentPrices}>
                    Save
                  </Button>
                  </>)
                  :
                  (<>
                  </>)}
            </div>
          </Box>
        </div>
      </main>

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

export default StickerPricing;
