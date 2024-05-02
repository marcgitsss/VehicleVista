import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  Button,
  Container,
  Snackbar,
  TextField,
  FormControlLabel,
} from "@mui/material";
import FileUpload from "./uploadImage";
import axios from "axios";

export default function RegistrationForm() {
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
  });

  useEffect(() => {
    console.log(localStorage.getItem("token"));
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
    // Check if both orcrFile and licenseFile are not null
    if (!orcrFile || !licenseFile) {
      // If any of the files is missing, display an error message and prevent form submission
      setSnackbarMessage("Please upload both OR/CR and License");
      setSnackbarOpen(true);
      return; // Exit the function early
    }
  
    const invalidFields = validateForm();
    if (invalidFields.length === 0) {
      // If validation passes, handle form submission
      // Your submission logic here
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
    if (!/^[a-zA-Z]+$/.test(registrationData.surname)) {
      errors.surname = "Surname must contain only letters";
    }
    if (!/^[a-zA-Z]+$/.test(registrationData.givenname)) {
      errors.givenname = "Given Name must contain only letters";
    }
    if (!/^[a-zA-Z]+$/.test(registrationData.mi)) {
      errors.mi = "M.I. must contain only letters";
    }
    if (!/^[\sa-zA-Z.]+$/.test(registrationData.sname)) {
      errors.sname = "Name of Student must contain only letters, spaces, and periods";
    }
    if (!/^\d{8}$/.test(registrationData.idno)) {
      errors.idno = "ID Number must be 8 digits long";
    }
    if (!/^(09|\+639)\d{9}$/.test(registrationData.contactno)) {
      errors.contactno = "Contact number must be in the format 09123456789";
    }
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
              <TextField
                variant="filled"
                label="Surname"
                value={registrationData.surname}
                name="surname"
                onChange={handleInputChange}
                error={!!inputErrors.surname}
                helperText={inputErrors.surname || "Required"}
                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
              />
              <TextField
                variant="filled"
                label="Given Name"
                value={registrationData.givenname}
                name="givenname"
                onChange={handleInputChange}
                error={!!inputErrors.givenname}
                helperText={inputErrors.givenname || "Required"}
                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
              />
              <TextField
                variant="filled"
                label="M.I."
                value={registrationData.mi}
                name="mi"
                onChange={handleInputChange}
                error={!!inputErrors.mi}
                helperText={inputErrors.mi || "Required"}
                sx={{ flex: 0.5, marginBottom: "1rem" }}
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
              <TextField
                variant="filled"
                label="Name of Student"
                value={registrationData.sname}
                name="sname"
                onChange={handleInputChange}
                error={!!inputErrors.sname}
                helperText={inputErrors.sname || "Required"}
                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
              />
              <TextField
                variant="filled"
                label="ID Number"
                value={registrationData.idno}
                name="idno"
                onChange={handleInputChange}
                error={!!inputErrors.idno}
                helperText={inputErrors.idno || "Required"}
                sx={{ flex: 1, marginBottom: "1rem" }}
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
              <TextField
                variant="filled"
                label="Grade/Year Level"
                value={registrationData.yearlevel}
                name="yearlevel"
                onChange={handleInputChange}
                error={!!inputErrors.yearlevel}
                helperText={inputErrors.yearlevel || "Required"}
                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
              />
              <TextField
                variant="filled"
                label="Contact No"
                value={registrationData.contactno}
                name="contactno"
                onChange={handleInputChange}
                error={!!inputErrors.contactno}
                helperText={inputErrors.contactno || "Required"}
                sx={{ flex: 1, marginBottom: "1rem" }}
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
              <TextField
                variant="filled"
                label="Address"
                value={registrationData.address}
                name="address"
                onChange={handleInputChange}
                error={!!inputErrors.address}
                helperText={inputErrors.address || "Required"}
                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
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
                <TextField
                  variant="filled"
                  label="Vehicle Make"
                  value={registrationData.vmake}
                  name="vmake"
                  onChange={handleInputChange}
                  error={!!inputErrors.vmake}
                  helperText={inputErrors.vmake || "Required"}
                  sx={{ flex: 2, marginBottom: "1rem", marginRight: "1rem" }}
                />
                <TextField
                  variant="filled"
                  label="Plate No"
                  value={registrationData.plateno}
                  name="plateno"
                  onChange={handleInputChange}
                  error={!!inputErrors.plateno}
                  helperText={inputErrors.plateno || "Required"}
                  sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
                />
                <TextField
                  variant="filled"
                  label="Color"
                  value={registrationData.color}
                  name="color"
                  onChange={handleInputChange}
                  error={!!inputErrors.color}
                  helperText={inputErrors.color || "Required"}
                  sx={{ flex: 1, marginBottom: "1rem" }}
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
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginRight: "1rem" }}
              >
                Vehicle Type:
              </Typography>
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
