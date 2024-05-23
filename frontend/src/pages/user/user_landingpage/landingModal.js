import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./landingModal.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import axios from "axios";
import ChooseUserTypeModal from "../vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import { Link } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [verificationSuccess, setVerificationSuccess] = React.useState(false);
  const [emailSending, setEmailSending] = React.useState(false); // Loading state for sending email
  const [otpVerifying, setOtpVerifying] = React.useState(false); // Loading state for verifying OTP

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");

    try {
      setEmailSending(true); // Set loading state to true
      const res = await axios.post("http://localhost:8080/register/generateOtp/", {
        email,
      });

      if (res.data.id === null){
        console.log(res.data)
        setSnackbarMessage("Failed to send email");
      } else{
        setSnackbarMessage("Email Sent Successfully");
        console.log(res.data)
      }
      setSnackbarOpen(true);

      
    } catch (error) {
      setSnackbarMessage("Failed to send email");
      setSnackbarOpen(true);
    } finally {
      setEmailSending(false); // Reset loading state to false
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setCodeError("Please enter the verification code");
      return;
    }
    setCodeError("");

    try {
      setOtpVerifying(true); // Set loading state to true
      const res = await axios.post(
        "http://localhost:8080/register/verifyOtp/",
        { email, otp: code }
      );
      if (res.data === "Matched") {
        setVerificationSuccess(true);
      } else {
        setSnackbarMessage(res.data); // Display server response message in Snackbar
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again later.");
      setSnackbarOpen(true);
    } finally {
      setOtpVerifying(false); // Reset loading state to false
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
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
        slotProps={{ backdrop: { timeout: 500 } }}
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
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={`error ${emailError ? "visible" : ""}`}>
                {emailError}
              </span>
              <button className="button-maroon" onClick={handleSend}>
                {emailSending ? <CircularProgress size={24} /> : "Send"}
              </button>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <label>Enter Code</label>
              <input
                type="text"
                className="input-style"
                style={{
                  flex: "1",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                  width: "100%",
                }}
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <span className={`error ${codeError ? "visible" : ""}`}>
                {codeError}
              </span>
              <button className="button-maroon" onClick={handleSubmit}>
                {otpVerifying ? <CircularProgress size={24} /> : "Submit"}
              </button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        sx={{ zIndex: 100000 }} // Set a higher z-index directly on the Snackbar component
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Modal after successful verification */}
      {verificationSuccess && (
        <Modal
            aria-labelledby="verification-modal-title"
            aria-describedby="verification-modal-description"
            open={verificationSuccess}
            onClose={() => setVerificationSuccess(false)}
            closeAfterTransition
            slots={{backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
          >
            <Fade in={verificationSuccess}>
              <Box sx={style}>
              <Typography
                  id="verification-modal-title"
                  variant="h4"
                  component="h2"
                  >
              Verification Successful
              </Typography>
              <Typography id="verification-modal-description" sx={{ mt: 2 }}>
                Your verification was successful. Proceed to choose your user
                type.
              </Typography>
              {/* <Button >
              Close
              </Button> */}
                <Link to="/login">
                  <Button >
                    Proceed to log in
                  </Button>
                </Link>
              </Box>
            </Fade>
          </Modal>
          )}
          </div>
          );
          }
