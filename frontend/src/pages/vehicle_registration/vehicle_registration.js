import React, { useState } from "react";
import { Typography, Box, FormControlLabel, Radio, RadioGroup, Button, Container, Modal } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import FileUpload from "./uploadImage";
import PayMod from "./payMod"; // Import the PayMod component
import "./registration.css"; // Import the CSS file

export default function Registration() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orcrFile, setORCRFile] = useState(null); // State to store OR/CR file
  const [licenseFile, setLicenseFile] = useState(null); // State to store License file
  const [modalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalRegistrationData, setModalRegistrationData] = useState(null); // State to store registration data for modal

  const handleORCRUpload = (e) => {
    const file = e.target.files[0];
    setORCRFile(file);
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    setLicenseFile(file);
  };

  // State variable to store form data
  const [registrationData, setRegistrationData] = useState({
    surname: "",
    givenname: "",
    mi:"",
    sname:"",
    idno:"",
    yearlevel:"",
    contactno:"",
    vmake:"",
    
  });

  const validateForm = () => {
    let invalidFields = [];
    
    // Check for empty required fields
    if (!registrationData.surname) {
      invalidFields.push('Surname');
    }
    if (!registrationData.givenname) {
      invalidFields.push('Given name');
    }
    if (!registrationData.sname) {
      invalidFields.push('Name of student');
    }
    if (!registrationData.idno) {
      invalidFields.push('ID number');
    }
    if (!registrationData.yearlevel) {
      invalidFields.push('Grade/Year level');
    }
    if (!registrationData.contactno) {
      invalidFields.push('Contact number');
    } else {
      // Validate contact number format
      const contactNoRegex = /^\+639\d{9}$/; // Regex for "+639" followed by 9 digits
      if (!contactNoRegex.test(registrationData.contactno)) {
        invalidFields.push('Contact number format');
      }
    }
    if (!registrationData.vmake) {
      invalidFields.push('Vehicle make');
    }
    
    // Convert invalidFields to an array if it's not already
    invalidFields = Array.isArray(invalidFields) ? invalidFields : [invalidFields];
  
    if (invalidFields.length > 0) {
      const errorMessage = `Please fill in all required fields and correct the following: ${invalidFields.join(', ')}.`;
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      return true; // Validation fails
    }
  
    return false; // Validation passes
  };
  
  
  
  
  
  // Function to handle form submission
  
const handleSubmit = () => {
  // Validate form
  const invalidFields = validateForm();
  if (!invalidFields) {
    // If validation passes, set modal state and registration data
    setShowModal(true);
    setModalRegistrationData(registrationData);
  } else {
    // If validation fails, display error message
    const errorMessage = `Please fill in all required fields and correct the following: ${Array.isArray(invalidFields) ? invalidFields.join(', ') : invalidFields}`;
    setSnackbarMessage(errorMessage);
    setSnackbarOpen(true);
  }
};


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  // Function to handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If the input is MI, limit the input to one character
    if (name === "mi" && value.length > 1) {
      return;
    }

    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle radio button changes and update state
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      vehicleType: value,
    }));
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  


  console.log(registrationData);
  return (
    <Container maxWidth="lg"> 
      <Box sx={{ p: 2, alignItems: 'center' }}>
        <Typography sx={{ m: 2, fontSize: "1.75rem", textAlign: 'center' }}>APPLICATION FORM FOR VEHICLE STICKER</Typography>
        <div style={{ backgroundColor: '#F4C522', borderRadius: '1rem', padding: '2rem', margin: '2rem' }}>
          <Typography sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', fontSize: '1.5rem' }}>PERSONAL DATA</Typography>

          {/* Name application */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '1rem', marginBottom: '1rem' }}>
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Name of Applicant/Driver:</label>
              <input 
                type="text" 
                className="input-style" 
                style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                placeholder="Surname"
                value={registrationData.surname}
                name="surname"
                onChange={handleInputChange}
                />
              <input 
                type="text" 
                className="input-style" 
                style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '1rem', marginBottom: '1rem' }}>
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Name of Student:</label>
                <input 
                  type="text" 
                  className="input-style" 
                  style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                  placeholder="Full Name" 
                  value={registrationData.sname}
                  name="sname"
                  onChange={handleInputChange}
                  />
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>ID Number: </label>
                <input 
                  type="text" 
                  className="input-style" 
                  style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                  placeholder="e.g. 21-1234-4567"
                  value={registrationData.idno}
                  name="idno"
                  onChange={handleInputChange} />
            </div>
          </div>

          {/* Grade Year Level and Contact No */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '1rem', marginBottom: '1rem' }}>
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Grade/Year Level:</label>
                <input 
                  type="text" 
                  className="input-style" 
                  style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                  placeholder="BSIT - 1" 
                  value={registrationData.yearlevel}
                  name="yearlevel"
                  onChange={handleInputChange}
                  />
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Contact No: </label>
                <input 
                  type="text" 
                  className="input-style" 
                  style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                  placeholder="e.g. +6391234565789"
                  value={registrationData.contactno}
                  name="contactno"
                  onChange={handleInputChange}
                  />
            </div>
          </div>

          {/* Address */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '1rem', marginBottom: '1rem' }}>
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Address:</label>
                <input 
                  type="text" 
                  className="input-style" 
                  style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                  placeholder="e.g. 123 Main St, City, Country" 
                  value={registrationData.address}
                  name="address"
                  onChange={handleInputChange}/>

            </div>
          </div>
          
          <div style={{ backgroundColor: '#EFEFEF', borderRadius: '0.5rem', padding: '1rem' }}>

            <Typography sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', fontSize: '1.5rem' }}>
              VEHICLE DATA
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Vehicle Make, Plate No., Color */}
              <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '1rem', marginBottom: '1rem' }}>
                <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Vehicle Make:</label>
                  <input 
                    type="text" 
                    className="input-style" 
                    style={{ flex: "2", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                    placeholder="e.g. Toyota Corolla 2013" 
                    value={registrationData.vmake}
                    name="vmake"
                    onChange={handleInputChange}
                    />
                <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" , }}>Plate No:</label>

                  <input type="text" className="input-style" style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} placeholder="e.g AAA1234" value={registrationData.plateno} name="plateno" onChange={handleInputChange} />

                <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>Color:</label>

                  <input type="text" className="input-style" style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} placeholder="e.g White" value={registrationData.color} name="color" onChange={handleInputChange} />
              </div>
            </div>
            {/* Vehicle Type */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <label className="bold-label" style={{ fontSize: "1.125rem", marginBottom: "1rem", marginRight: "1rem" }}>
                Vehicle Type:
              </label>

              <RadioGroup
                name="vehicleType"
                value={registrationData.vehicleType}
                onChange={handleRadioChange}
                style={{ flexDirection: 'row' }}
              >
                <FormControlLabel value="2 Wheeler" control={<Radio />} label="2 Wheeler" />
                <FormControlLabel value="4 Wheeler" control={<Radio />} label="4 Wheeler" />
              </RadioGroup>
                    
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: "1rem" }}>

              <FileUpload label="OR/CR" onChange={setORCRFile} />
              <FileUpload label="License" onChange={setLicenseFile} />
              </div>
            </div>
          </div>
          
          <Button
            variant="contained"
            sx={{
              m: '1rem',
              backgroundColor: '#8A252C',
              color: '#F4C522' // Use color property to change font color
            }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>

          {/* Modal for displaying registration data */}
          
            {/* Render PayMod component here with registration data */}
            {modalRegistrationData && (
              <PayMod modalRegistrationData={modalRegistrationData} />
            )}
         
 

        </div>
      </Box>
      
        {/* Snackbar for displaying validation errors */}
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}
