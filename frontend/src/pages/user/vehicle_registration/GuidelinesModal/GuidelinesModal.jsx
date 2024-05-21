import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup, Snackbar } from "@mui/material";
import "./GuidelinesModal.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(60vw - 4em)",
  height: "calc(80vh - 4em)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function GuidelinesModal(props) {
  const [checked, setChecked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [messageOpen, setMessageOpen] = useState(false);
  const isStaff = localStorage.getItem("isStaff");
  // const isStaff = false
  const [twoWheelPU, setTwoWheelPU] = useState()
  const [fourWheelPU, setFourWheelPU] = useState()
  const [twoWheelPK, setTwoWheelPK] = useState()
  const [fourWheelPK, setFourWheelPK] = useState()
  const [schoolYear, setSchoolYear] = useState()
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/prices/get-prices');
        console.log("isStaff", isStaff)
  
        const isStaffBool = isStaff === "true"; // Convert to boolean
        if (isStaffBool) {
          setTwoWheelPU(response.data.staffTwoWheelPickup)
          setFourWheelPU(response.data.staffFourWheelPickup)
          setTwoWheelPK(response.data.staffTwoWheelPickup)
          setFourWheelPK(response.data.staffFourWheelPickup)
        } else {
          setTwoWheelPU(response.data.studentTwoWheelPickup)
          setFourWheelPU(response.data.studentFourWheelPickup)
          setTwoWheelPK(response.data.studentTwoWheelParking)
          setFourWheelPK(response.data.studentFourWheelParking)
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
  
      try {
        const response = await axios.get('http://localhost:8080/config/get-expiration');
        // console.log(response);
        setSchoolYear(response.data.schoolYear);
  
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, [isStaff, trigger]); // The empty array [] means this effect will only run once
  

  const handleCloseModal = () => {
    setTrigger(!trigger)
    props.toggleModal(false);
  };

  const handleCheckboxChange = (event) => {
    setChecked((x) => !x);
  };


  const handleSubmit = () => {
    if (checked) {
      const formData = { ...props.registrationData };
      props.toggleModal((x) => !x);
      setSnackbarOpen(false);
      // Proceed to next page
      navigate("/registration");

    } else {
      setMessageOpen(true);
      setTimeout(() => {
        setMessageOpen(false);
      }, 3000);
      setSnackbarMessage("Please agree that you have read and understood the guidelines before submitting");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal
        open={props.isModalOpen ?? false}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Content */}
          <div className="guidelines-container">
            <div className="guidelines-header">
              CEBU INSTITUTE OF TECHNOLOGY UNIVERSITY <br />
              <br />
              GUIDELINES ON ENTRY OF VEHICLES
            </div>

            <ol className="guidelines-body">
              <li className="guidelines-text-block">
                <span className="bold">
                  Vehicle and Gate Pass Registration and Requirements:
                </span>
                &nbsp; To gain vehicular access to the University campus,
                students, parents/guardians, faculty, staff, and administrators,
                must apply and regsiter their vehicles at the SSD office. Once
                approved, they will receive a sticker pass for their vehicles.
                Here are the requirements for obtaining the CIT-U vehicle
                sticker:
                <div className="indent bold">
                  1.1 Photocopy of Valid Certificate of Registration (CR) and
                  the Official Receipt (OR) of the Vehicle/s in the name of the
                  Applicant
                  <br />
                  1.2 Those with newly purchased or secondhand vehicles waiting
                  for the Land Transportation Office to release their CR/OR may
                  submit a Certificate of Purchase/Ownership from the car dealer
                  or the Deed of Sale from the vendor in the name of the
                  applicant <br />
                  1.3 Valid Driver's License of the applicant <br />
                  1.4 Original Receipt from the Finance and Accounting Office
                  (FAO) to confirm the payment of the registration fee
                </div>
              </li>

              <li className="guidelines-text-block">
                <span className="bold">Registration Fee:</span> Two-(2) Vehicle
                sticker application is allowed per family
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>S.Y. {schoolYear}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Prices</td>
                    </tr>
                    <tr>
                      <td>4-Wheel Parking</td>
                      <td><b>PHP{fourWheelPK}</b>/{isStaff === 'true' ? 'Year' : 'Semester'}</td>
                    </tr>
                    <tr>
                      <td>2-Wheel Parking</td>
                      <td><b>PHP{twoWheelPK}</b>/{isStaff === 'true' ? 'Year' : 'Semester'}</td>
                    </tr>
                    <tr>
                      <td>4-Wheel DROP&PICK</td>
                      <td><b>PHP{fourWheelPU}</b>/{isStaff === 'true' ? 'Year' : 'Semester'}</td>
                    </tr>
                    <tr>
                      <td>2-Wheel DROP&PICK</td>
                      <td><b>PHP{twoWheelPU}</b>/{isStaff === 'true' ? 'Year' : 'Semester'}</td>
                    </tr>

                  </tbody>
                </table>
                <div className="guidelines-note bold">
                  PARKING SLOTS ARE LIMITED <br />
                  NOTE: All stickers are <s>non-transferable</s> and will be
                  valid until the end of the semester for students
                </div>
              </li>

              <li className="guidelines-text-block">
                <div className="bold">Conditions: </div>
                Entry and parking inside the campus are privileges granted by
                the University through the Vehicle and Gate Passes. Pass holders
                are required to adhere to the following conditions:
                <div className="indent">
                  3.1. The CIT-U Safety & Security Department personnel/guards
                  are authorized to inspect vehicles arriving and departing from
                  the campus. When approaching the campus gates, tinted windows
                  should be rolled down for proper identification of vehicle
                  passengers. In the evening, headlights should be dimmed when
                  approaching the guardhouse.
                </div>
                <div className="indent">
                  3.2. Faculty members, administrative personnel, and college students are eligible to request
                  vehicle stickers for parking purposes. However, applicants from the Basic Education department
                  (Elementary to SHS) are limited to obtaining stickers specifically for drop-off and pick-up purposes.
                  Vehicles assigned for drop-off and pickup will be granted a 20-minute grace period for parking.
                </div>
                <div className="indent">
                  3.3. CIT-U employees are advised not to park their vehicles near the main and backgate for purpose of time in and time out
                </div>
                <div className="indent">
                  3.4. The sticker shall remain mounted at all times on the designated vehicle.
                  No vehicle shall be allowed entry into and to park inside the University campus without the appropriate pass
                </div>
                <div className="indent">
                  <b>3.5. The vehicle owner/driver agrees to conform to the following:</b>
                  <br />
                  <span style={{ marginLeft: '5%' }}>3.5.1. All policies governing the operation of motor vehicles</span><br />
                  <span style={{ marginLeft: '5%' }}>3.5.2. All traffic rules and policies</span><br />
                  <span style={{ marginLeft: '5%' }}>3.5.3. 10km/hr speed limit within the campus area</span><br />
                  <span style={{ marginLeft: '5%' }}>3.5.4. Strict adherence to road signs</span><br />
                  <span style={{ marginLeft: '5%' }}>3.5.5. No blowing of horns and no obstruction while inside the campus</span>
                </div>
                <div className="indent">
                  3.6. The vehicle owner will be responsible forthe cost of replacing lost, stolen, or destroyed stickers which is the same cost for obtaining
                  a new sticker
                </div>
                <div className="indent">
                  3.7. Parking is on a first-come-first-serve basis in designated parking areas: Full parking will be
                  enforced, and drivers must wait with their vehicles until a parking space becomes available. Unattended vehicles are not permitted in full parking
                  areas.<br />
                  <b>Overnight Parking is Prohibited</b>
                </div>
                <div className="indent">
                  3.8. Campus visitors will be issued a temporary pass in the form of a laminated card and will be directed to "Open Parking" areas or appropriate
                  visitor parking areas.
                </div>
                <div className="indent">
                  3.9. The vehicle owner/driver understands that any violations of the conditions set forth by the University may result in the termination of this
                  previlege.<br />
                  <b>Due to limited space, the University can ONLY acommodate ({200}) parking spaces for students, and
                    ({270}) parking spaces for personnel.</b>
                </div>
                <li className="guidelines-text-block">
                  <b> Transfer of Ownership of Vehicle: </b> if vehicle ownership is transferred to another person, the registered owner must inform the SSD prior
                  to the transfer. This ensures that the removal of the sticker and the appropriate update of the records of the office.
                </li>
                <li className="guidelines-text-block">
                  <b>Liability: </b> The University shall not assume liability for any loss or damage incurred by vehicles or items
                  stolen from them. Additionally, the University shall not be held responsible for any loss or damage caused to vehicles and their
                  belongings while on University premises due to weather or other natural causes or conditions. This provision also ensures to non-vehicular
                  modes of transportation such as bicycles or E-bikes.
                  <br />
                  <br />
                </li>

              </li>
            </ol>
            <div className="guidelines-footer">
              <FormGroup style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="I have read and understood the Guidelines"
                />
                <div>
                {messageOpen && (
                  <div className="snackbar" style={{ color: "red", padding: ".5rem", display: "flex", alignItems: "center", justifyContent: "center"  }}>{snackbarMessage}</div>
                )}
                </div>
                
                <Button variant="contained" onClick={handleSubmit}  sx={{ minWidth: "25rem" }}>
                  Submit
                </Button>
              </FormGroup>
            </div>
            
          </div>
        </Box>
      </Modal>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Please agree to the terms and conditions before submitting"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      /> */}
    </div>
  );
}
