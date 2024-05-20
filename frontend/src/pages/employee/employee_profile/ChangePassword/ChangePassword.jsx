import { Box, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import './ChangePassword.css';

/**
 * Validation:
 * 1. new password, confirm new password must match
 * 2. must 1 uppercase and 1 special character
 * 3. must not have spaces
 */
const ChangePassword = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // FOR TESTING CHANGE EMAIL LANG
  // const username  = "jessreygarrido22@gmail.com"; 
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token , {header:true});
  const username = decodedToken.sub;

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log({
      currentPassword, newPassword, confirmNewPassword
    })

    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const whitespaceRegex = /\s/

    if (!specialCharRegex.test(newPassword)) {
      setSnackbarOpen(true)
      setSnackbarMessage("New Password Must have atleast 1 Special Character")
      return
    }

    if (!uppercaseRegex.test(newPassword)) {
      setSnackbarOpen(true)
      setSnackbarMessage("New Password Must have atleast 1 Uppercase Character")
      return
    }

    if (!numberRegex.test(newPassword)) {
      setSnackbarOpen(true)
      setSnackbarMessage("New Password Must have atleast 1 Number")
      return
    }

    if (whitespaceRegex.test(newPassword)){
      setSnackbarOpen(true)
      setSnackbarMessage("New Password must not have spaces")
      return
    }


    if (newPassword !== confirmNewPassword) {
      setSnackbarOpen(true)
      setSnackbarMessage("New Password Do not match")
      return
    }
    const data = {
      username: username,
      oldPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    try {
      const res = await axios.post('http://localhost:8080/jwt/change-password', data);
      console.log(res.data);
      setSnackbarOpen(true);
      setSnackbarMessage("Password changed successfully!");
    } catch (error) {
      console.error('There was an error making the POST request!', error);
      setSnackbarOpen(true);
      setSnackbarMessage("There was an error changing the password.");
    }

    

    setSnackbarOpen(false);

    

  }

  const resetButton = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  return (
    <>
      <Box className="user-profile-box" component="form" onSubmit={onSubmit}>
        <div className="up-changepass">

          <h2>Change Password</h2>
          <TextField id="outlined-basic" label="Current Password" variant="outlined" required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField id="outlined-basic" label="New Password" variant="outlined" required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField id="outlined-basic" label="Confirm New Password" variant="outlined" required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <div className="up-button-container">
            <Button variant="text" onClick={resetButton}>Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </div>
        </div>
      </Box>

      {/* Snackbar for displaying validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  )
}

export default ChangePassword;