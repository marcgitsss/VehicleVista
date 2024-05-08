import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./VerifyEmailModal.css";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

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

export default function VerifyEmailModal({ onClose }) {
  const [open, setOpen] = React.useState(true); // Open the modal by default
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [codeError, setCodeError] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [correctCode, setCorrectCode] = React.useState(false);
  const navigate = useNavigate(); // Access to navigate function for navigation

  React.useEffect(() => {
    if (correctCode) {
      // If correctCode becomes true, navigate to the registration page
      navigate('/forgotpass');
    }
  }, [correctCode, navigate]);

  React.useEffect(() => {
    handleOpen(); // Open the modal when the component mounts
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');

    // Send email logic here
    //RETURNS ID: NULL if not exist therefore atong buhaton is error if null ang response.data.id
    axios.post('http://localhost:8080/forgot-password/generate-otp', null, {
      params: {
        email: email
      }
    })
    .then(response => {
      console.log('Email sent successfully');
      // Show Snackbar]
      console.log(response.data);
      setSnackbarOpen(true);
    })
    .catch(error => {
      console.error('Error sending email:', error);
      // Handle error and show Snackbar
      setSnackbarOpen(true);
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
  axios.post('http://localhost:8080/forgot-password/verify-otp', null, {
    params: {
      email: email,
      otp: code
    }
  })
  .then(response => {
    console.log(response);
    // Show Snackbar
    setSnackbarOpen(true);
    navigate("/forgotpass", {
      state: {
        email: email
      }
    });
    //TODO: Transfer to Next Page

  })
  .catch(error => {
    console.error('Error submitting code:', error);
    // Handle error and show Snackbar
    setSnackbarOpen(true);
  });
};

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
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
              <span className={emailError ? "error" : ""}>{emailError}</span>
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
