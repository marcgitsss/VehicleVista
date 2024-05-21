import React, { useEffect, useState } from "react";
import { Box, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/jwt/decode", null,
            {
              params: { token: token }
            }
          );
          setEmail(response.data.payload.sub);
          console.log("email:", response.data.payload.sub);
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
      setSnackbarMessage("New Password must have at least 1 special character");
      setSnackbarOpen(true);
      return;
    }

    if (!uppercaseRegex.test(newPassword)) {
      setSnackbarMessage("New Password must have at least 1 uppercase character");
      setSnackbarOpen(true);
      return;
    }

    if (!numberRegex.test(newPassword)) {
      setSnackbarMessage("New Password must have at least 1 number");
      setSnackbarOpen(true);
      return;
    }

    if (whitespaceRegex.test(newPassword)) {
      setSnackbarMessage("New Password must not have spaces");
      setSnackbarOpen(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage("New Passwords do not match");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/jwt/change-password', {
        username: email,
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
      });

      console.log("Response:", response.data);

      if (response.data === true) {
        setSnackbarMessage('Password changed successfully');
        setSnackbarOpen(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setSnackbarMessage(response.data.message || 'Password change unsuccessful');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('There was an error making the POST request!', error);
      setSnackbarMessage("There was an error changing the password.");
      setSnackbarOpen(true);
    }
  };

  const handleClickShowPassword = (type) => {
    switch(type) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmNew':
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box className="user-profile-box" component="form" onSubmit={onSubmit}>
        <div className="up-changepass">
          <h2>Change Password</h2>
          <TextField
            id="current-password"
            label="Current Password"
            variant="outlined"
            required
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('current')}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="new-password"
            label="New Password"
            variant="outlined"
            required
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('new')}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="confirm-new-password"
            label="Confirm New Password"
            variant="outlined"
            required
            type={showConfirmNewPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('confirmNew')}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
