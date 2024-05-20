import React, { useState, useEffect } from "react";
import ModalComponent from "./SuccessModal";
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
  CircularProgress,
} from "@mui/material";
import FileUpload from "./uploadImage";
import axios from "axios";
import { useUser } from "../../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

export default function RegistrationForm1() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [orcrFile, setORCRFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const token = localStorage.getItem("token");

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
    isFourWheel: "",
    stickerType: "",
    address: "", // Add address field here
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
    isFourWheel: "",
  });

  useEffect(() => {
    console.log(token);
  }, []);

  const handleSubmit = async () => {
    // Validate the form
    const invalidFields = validateForm();

    // Check if there are any validation errors
    if (invalidFields.length > 0 || !orcrFile || !licenseFile) {
      // If there are validation errors or if OR/CR or License files are missing
      let errorMessage = "";

      // Check if OR/CR file is missing
      if (!orcrFile) {
        errorMessage = "Please upload OR/CR file.";
      }

      // Check if License file is missing
      if (!licenseFile) {
        errorMessage += " Please upload License file.";
      }

      // Display validation error message if any
      if (invalidFields.length > 0) {
        errorMessage += ` Please fill in all required fields and correct the following: ${invalidFields.join(
          ", "
        )}`;
      }

      // Display error message in Snackbar
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);

      // Exit the function early
      return;
    }

    setLoading(true); // Show loader while waiting for submission

    try {
      // Submit data to the server
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const decodedtoken = jwtDecode(token,{header: true});
      const isFourWheel = registrationData.isFourWheel;
      const email = decodedtoken.sub;
      const isStaff = localStorage.getItem("isStaff");
      const stickerType = registrationData.stickerType;
      // Submit applicant registration data
      const res1 = await axios.post(
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
          isFourWheel: isFourWheel,
          isStaff: isStaff,
          isParking: stickerType,
        },
        config
      );

      // Upload OR/CR and License files
      const formData = new FormData();
      formData.append("orcrimg", orcrFile);
      formData.append("licenseimg", licenseFile);
      formData.append("email", email);

      const config2 = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const res2 = await axios.post(
        "http://localhost:8080/applicants/uploadReq", null ,
        formData,
        config2
      );

      // If both requests are successful, show success message
      if (res1.status === 200 && res2.status === 200) {
        setSnackbarMessage("Registration successful");
        setSnackbarOpen(true);
      } else {
        // If any request fails, show error message
        setSnackbarMessage(
          "An error occurred during registration. Please try again later."
        );
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Handle any errors that occur during submission
      setSnackbarMessage(
        "An error occurred during registration. Please try again later."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate Surname
    if (!registrationData.surname.trim()) {
      errors.surname = "Surname is required";
    } else if (!/^[a-zA-Z\s]+$/.test(registrationData.surname)) {
      errors.surname = "Surname must contain only letters and spaces";
    }

    // Validate Given Name
    if (!registrationData.givenname.trim()) {
      errors.givenname = "Given Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(registrationData.givenname)) {
      errors.givenname = "Given Name must contain only letters and spaces";
    }

    // Validate M.I.
    if (!registrationData.mi.trim()) {
      errors.mi = "M.I. is required";
    } else if (!/^[a-zA-Z]+$/.test(registrationData.mi)) {
      errors.mi = "M.I. must contain only letters";
    }

    // Validate Name of Student
    if (!registrationData.sname.trim()) {
      errors.sname = "Name of Student is required";
    } else if (!/^[a-zA-Z\s.]+$/.test(registrationData.sname)) {
      errors.sname =
        "Name of Student must contain only letters, spaces, and periods";
    }

    // Validate ID Number
    if (
      !registrationData.idno.trim() ||
      !/^\d*(-\d*)*$/.test(registrationData.idno)
    ) {
      errors.idno = "ID Number must only contain digits and dashes";
    }

    // Validate Grade/Year Level
    if (!registrationData.yearlevel.trim()) {
      errors.yearlevel = "Grade/Year Level is required";
    }

    // Validate Contact Number
    if (
      !registrationData.contactno.trim() ||
      !/^(09|\+639)\d{9}$/.test(registrationData.contactno)
    ) {
      errors.contactno = "Contact number must be in the format 09123456789";
    }

    // Validate Vehicle Make
    if (!registrationData.vmake.trim()) {
      errors.vmake = "Vehicle Make is required";
    }

    // Validate Plate No
    if (!registrationData.plateno.trim()) {
      errors.plateno = "Plate No is required";
    }

    // Validate Color
    if (!registrationData.color.trim()) {
      errors.color = "Color is required";
    }

    // Validate Address
    if (!registrationData.address.trim()) {
      errors.address = "Address is required";
    }

    // Validate Vehicle Type
    if (registrationData.isFourWheel === null) {
      errors.isFourWheel = "Vehicle Type is required";
    }
    if (registrationData.stickerType === "") {
      errors.stickerType = "Sticker Type is required";
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
    const isFourWheeler = value === "true"; // Set isFourWheeler to true if "4 Wheeler" is selected
    setRegistrationData((prevData) => ({
      ...prevData,
      isFourWheel: isFourWheeler, // Update isFourWheel directly with the boolean value
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      isFourWheel: "", // Reset any previous validation error
    }));
  };

  const handleStickerChange = (e) => {
    const { value } = e.target;
    const isParking = value === "true";
    setRegistrationData((prevData) => ({
      ...prevData,
      stickerType: isParking,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      stickerType: "",
    }));
  };

  // console.log("orcr", orcrFile);
  // console.log("license", licenseFile);
  // console.log("email", email);
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
                sx={{ flex: 1, marginBottom: "1rem" }}
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
                name="isFourWheel"
                value={registrationData.isFourWheel}
                onChange={handleRadioChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="2 Wheeler"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="4 Wheeler"
                />
              </RadioGroup>

              {/* Sticker Type */}
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginRight: "1rem" }}
              >
                Sticker Type:
              </Typography>
              <RadioGroup
                name="stickerType"
                value={registrationData.stickerType}
                onChange={handleStickerChange}
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Drop-off"
                  a
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Parking"
                />
              </RadioGroup>
            </div>
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

      {/* Loader */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Modal */}
      {modalOpen && (
        <ModalComponent
          onClose={() => setModalOpen(false)}
          // Pass necessary props to your modal component
        />
      )}
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