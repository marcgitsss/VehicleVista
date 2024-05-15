import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup, Snackbar } from "@mui/material";
import "./GuidelinesModal.css";
import { Link } from "react-router-dom";
import PayMod from "../payMod";


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

  const handleCheckboxChange = (event) => {
    setChecked((x) => !x);
  };
  const handleSubmit = () => {
    if (checked) {
      const formData = { ...props.registrationData };
      props.toggleModal((x) => !x);
      setSnackbarOpen(false);
      // Proceed to next page
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal
        open={props.isModalOpen ?? false}
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
                      <td colSpan={2}>S.Y. 2023-2024</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Prices</td>
                    </tr>
                    <tr>
                      <td>4-Wheel Parking</td>
                      <td>PHP2000/Semester</td>
                    </tr>
                    <tr>
                      <td>2-Wheel Parking</td>
                      <td>750/Semester</td>
                    </tr>
                    <tr>
                      <td>4-Wheel DROP&PICK</td>
                      <td>PHP400/Semester</td>
                    </tr>
                    <tr>
                      <td>2-Wheel DROP&PICK</td>
                      <td>PHP200/Semester</td>
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
              </li>
            </ol>
            <div className="guidelines-footer">
              <FormGroup>
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
                {/* <Link to="/assumptions-liability">
                  <Button variant="contained" onClick={handleSubmit}>
                      Submit
                      
                  </Button>
                </Link> */}
                <PayMod/>
              </FormGroup>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Please agree to the terms and conditions before submitting"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </div>
  );
}
