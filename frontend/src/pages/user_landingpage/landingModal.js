import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./landingModal.css";
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [codeError, setCodeError] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // Add Snackbar state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");

    // Send email logic here
    const res = axios.post("http://localhost:8080/register/generateOtp/", {
      email: email,
    });
    // Show Snackbar
    setSnackbarOpen(true);
  };

  const handleSubmit = () => {
    // Validate code
    if (!code.trim()) {
      setCodeError('Please enter the verification code');
      return;
    }
    setCodeError('');

    // Submit code logic here
    const res = axios.post("http://localhost:8080/register/verifyOtp/", {
      email: email,
      otp: code,
    });
    // Show Snackbar
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <button className="big-icon-button" onClick={handleOpen}>
        <PostAddIcon className="icon" style={{ fontSize: "5rem" }} />
        <span style={{ fontSize: "1.5rem" }}>New Registration</span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Email Verification
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <label>Enter Email</label>
              <input 
                type="text" 
                className="input-style" 
                style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={`error ${emailError ? 'visible' : ''}`}>{emailError}</span>
              <button className="button-maroon" onClick={handleSend}>Send</button>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <label>Enter Code</label>
              <input 
                type="text" 
                className="input-style" 
                style={{ flex: "1", marginBottom: "1rem", marginRight: "1rem", width: "100%" }} 
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <span className={codeError ? "error" : ""}>{codeError}</span>
              <button className="button-maroon" onClick={handleSubmit}>Submit</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      {/* Snackbar component */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        sx={{ zIndex: 1500 }} // Set a higher z-index directly on the Snackbar component
      >
        <MuiAlert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Email sent successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
