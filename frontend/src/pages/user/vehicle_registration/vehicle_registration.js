import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Container,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import FileUpload from "./uploadImage";
import PayMod from "./payMod"; // Import the PayMod component
import "./registration.css"; // Import the CSS file
import axios from "axios";

export default function Registration() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [orcrFile, setORCRFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  
  const [registrationData, setRegistrationData] = useState({
    surname: "",
    givenname: "",
    mi: "",
    sname: "",
    idno: "",
    yearlevel: "",
    contactno: "",
    vmake: "",
    plateno: "",
    color: "",
    vehicleType: "",
    stickerType: ""

  });
  const [inputErrors, setInputErrors] = useState({
    surname: "",
    givenname: "",
    mi: "",
    sname: "",
    idno: "",
    yearlevel: "",
    contactno: "",
    vmake: "",
    plateno: "",
    color: "",
    vehicleType: "",
    stickerType: "",
  });
  useEffect(() => {
    // console.log(token);
  }, []);

  const handleORCRUpload = (e) => {
    const file = e.target.files[0];
    setORCRFile(file);
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    setLicenseFile(file);
  };

  const handleSubmit = () => {
    const invalidFields = validateForm();
    if (invalidFields.length === 0) {
      // If validation passes, handle form submission
      // Your submission logic here
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const lastName = registrationData.surname;
      const firstName = registrationData.givenname;
      const middleInitial = registrationData.mi;
      const studentName = registrationData.sname;
      const idNumber = registrationData.idno;
      const gradeLevel = registrationData.yearlevel;
      const contactNumber = registrationData.contactno;
      const vehicleMake = registrationData.vmake;
      const address = registrationData.address;
      const plateNo = registrationData.plateno;
      const color = registrationData.color;
      const vehicleType = registrationData.vehicleType;
      const email = localStorage.getItem("email");
      const res = axios.post(
        "http://localhost:8080/applicants/register",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          middleInitial: middleInitial,
          studentName: studentName,
          address: address,
          idNumber: idNumber,
          gradeLevel: gradeLevel,
          contactNumber: contactNumber,
          vehicleMake: vehicleMake,
          plateNo: plateNo,
          color: color,
          vehicleType: vehicleType,
        },
        config
      );

      const formData = new FormData();
      formData.append("orcrimg", orcrFile);
      formData.append("licenseimg", licenseFile);
      formData.append("email", email);
      const config2 = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res2 = axios.post(
        "http://localhost:8080/applicants/uploadReq",
        formData,
        config2
      );
      setSnackbarMessage("Registration successful");
      setSnackbarOpen(true);
    } else {
      // If validation fails, display error messages
      const errorMessage = `Please fill in all required fields and correct the following: ${invalidFields.join(
        ", "
      )}`;
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(registrationData).forEach((key) => {
      if (registrationData[key] === "") {
        errors[key] = `${key} is required`;
      }
    });
    setInputErrors(errors);
    return Object.keys(errors);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      vehicleType: value,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      vehicleType: "",
    }));
  };

  const handleStickerChange = (e) => {
    const { value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      stickerType: value,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      stickerType: "",
    }));
  };

  console.log(registrationData);
  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 2, alignItems: "center" }}>
        <Typography sx={{ m: 2, fontSize: "1.75rem", textAlign: "center" }}>
          APPLICATION FORM FOR VEHICLE STICKER
        </Typography>
        <div
          style={{
            backgroundColor: "#F4C522",
            borderRadius: "1rem",
            padding: "2rem",
            margin: "2rem",
          }}
        >
          <Typography
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            PERSONAL DATA
          </Typography>

          {/* Name application */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            >
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Name of Applicant/Driver:
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="Surname"
                value={registrationData.surname}
                name="surname"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="Given name"
                value={registrationData.givenname}
                name="givenname"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="input-style"
                style={{ flex: "0.5", marginBottom: "1rem", width: "100%" }}
                placeholder="M.I."
                value={registrationData.mi}
                name="mi"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Name of Students and ID Number */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            >
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Name of Student:
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="Full Name"
                value={registrationData.sname}
                name="sname"
                onChange={handleInputChange}
              />
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                ID Number:{" "}
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="e.g. 21-1234-4567"
                value={registrationData.idno}
                name="idno"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Grade Year Level and Contact No */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            >
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Grade/Year Level:
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="BSIT - 1"
                value={registrationData.yearlevel}
                name="yearlevel"
                onChange={handleInputChange}
              />
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Contact No:{" "}
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="e.g. +6391234565789"
                value={registrationData.contactno}
                name="contactno"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            >
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Address:
              </label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                placeholder="e.g. 123 Main St, City, Country"
                value={registrationData.address}
                name="address"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#EFEFEF",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              VEHICLE DATA
            </Typography>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Vehicle Make, Plate No., Color */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  borderRadius: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <label
                  className="bold-label"
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  Vehicle Make:
                </label>
                <input
                  type="text"
                  className="input-style"
                  style={{
                    flex: "2",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                    width: "100%",
                  }}
                  placeholder="e.g. Toyota Corolla 2013"
                  value={registrationData.vmake}
                  name="vmake"
                  onChange={handleInputChange}
                />
                <label
                  className="bold-label"
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  Plate No:
                </label>

                <input
                  type="text"
                  className="input-style"
                  style={{
                    flex: "1",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                    width: "100%",
                  }}
                  placeholder="e.g AAA1234"
                  value={registrationData.plateno}
                  name="plateno"
                  onChange={handleInputChange}
                />

                <label
                  className="bold-label"
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  Color:
                </label>

                <input
                  type="text"
                  className="input-style"
                  style={{
                    flex: "1",
                    marginBottom: "1rem",
                    marginRight: "1rem",
                    width: "100%",
                  }}
                  placeholder="e.g White"
                  value={registrationData.color}
                  name="color"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Vehicle Type */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Vehicle Type:
              </label>

              <RadioGroup
                name="vehicleType"
                value={registrationData.vehicleType}
                onChange={handleRadioChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="2 Wheeler"
                  control={<Radio />}
                  label="2 Wheeler"
                />
                <FormControlLabel
                  value="4 Wheeler"
                  control={<Radio />}
                  label="4 Wheeler"
                />
              </RadioGroup>
           
               {/* Sticker Type */}
              <label
                className="bold-label"
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                Sticker Type:
              </label>

              <RadioGroup
                name="stickerType"
                value={registrationData.stickerType}
                onChange={handleStickerChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="DropOff"
                  control={<Radio />}
                  label="Drop-off"
                />
                <FormControlLabel
                  value="Parking"
                  control={<Radio />}
                  label="Parking"
                />
              </RadioGroup>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: "1rem",
                }}
              >
                <FileUpload label="OR/CR" onChange={setORCRFile} />
                <FileUpload label="License" onChange={setLicenseFile} />
              </div>
            </div>
            
          </div>

          <Button
            variant="contained"
            sx={{
              m: "1rem",
              backgroundColor: "#8A252C",
              color: "#F4C522", // Use color property to change font color
            }}
            onClick={handleSubmit} // Call handleSubmit function when the button is clicked
          >
            SUBMIT
          </Button>
        </div>
      </Box>

      {/* Snackbar for displaying validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}
