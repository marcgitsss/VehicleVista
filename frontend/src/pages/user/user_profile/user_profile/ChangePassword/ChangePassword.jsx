import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = ({ setShowChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [email, setEmail] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/jwt/decode",null,
            {
              params: { token:token }
            }
          );
          setEmail(response.data.payload.sub);
          console.log("email: ", response.data.payload.sub);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    } else {
      console.error("Token is missing or invalid.");
    }
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const whitespaceRegex = /\s/;

    if (!specialCharRegex.test(newPassword)) {
      setSnackbarOpen(true);
      setSnackbarMessage("New Password must have at least 1 special character");
      return;
    }

    if (!uppercaseRegex.test(newPassword)) {
      setSnackbarOpen(true);
      setSnackbarMessage("New Password must have at least 1 uppercase character");
      return;
    }

    if (!numberRegex.test(newPassword)) {
      setSnackbarOpen(true);
      setSnackbarMessage("New Password must have at least 1 number");
      return;
    }

    if (whitespaceRegex.test(newPassword)) {
      setSnackbarOpen(true);
      setSnackbarMessage("New Password must not have spaces");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSnackbarOpen(true);
      setSnackbarMessage("New Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/jwt/change-password', {
        username: email,
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      });
      console.log(res.data);
      setSnackbarOpen(true);
      setSnackbarMessage("Password changed successfully!");
    } catch (error) {
      console.error('There was an error making the POST request!', error);
      setSnackbarOpen(true);
      setSnackbarMessage("There was an error changing the password.");
    }
  };

  return (
    <>
      <Box className="user-profile-box" component="form" onSubmit={onSubmit}>
        <div className="up-changepass">
          <h2>Change Password</h2>
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            required
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Confirm New Password"
            variant="outlined"
            required
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className="up-button-container">
            <Button variant="text" onClick={() => setShowChangePassword(false)}>Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </div>
        </div>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default ChangePassword;
