import React, { useState, useEffect, useRef } from 'react';
import './PassCard.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function ForgetPasswordCard() {
  const location = useLocation();
  const { state } = location;
  const email = state.email;

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!passwordData.newPassword || !passwordData.confirmNewPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }

    // Check if new passwords match
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setSnackbarMessage('New passwords do not match.');
      setSnackbarOpen(true);
      return;
    }

    console.log(passwordData);

    // Make API call to change password
    // Change lang Ari na part jess ang API for forgot pass
    axios.post('http://localhost:8080/user/forgot-password', null, {
      params: {
        username: email,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmNewPassword
      }
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        // Show Snackbar for successful password change
        setSnackbarMessage('Password Reset successfully');
        setSnackbarOpen(true);
        // Clear input fields
        setPasswordData({
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        // Show Snackbar for unsuccessful password change
        setSnackbarMessage(response.data.message);
        setSnackbarOpen(true);
      }
    })
    .catch((error) => {
      console.error('Error during password change:', error);
      // Show Snackbar for error during password change
      setSnackbarMessage('An error occurred while changing password. Please try again later.');
      setSnackbarOpen(true);
    });

  };

  return (
    <div className="change-password-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>

          <div className="input-container">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              style={{ paddingRight: "2.5rem" }} // Add padding for the icon
            />
            <span
              className="visibility-icon"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px", // Adjust as per your design
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="input-container">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm new password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleInputChange}
              style={{ paddingRight: "2.5rem" }} // Add padding for the icon
            />
            <span
              className="visibility-icon"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px", // Adjust as per your design
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={toggleConfirmNewPasswordVisibility}
            >
              {showConfirmNewPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {/* Snackbar for successful or unsuccessful password change */}
          {snackbarOpen && (
            <div className="snackbar">{snackbarMessage}</div>
          )}
          <button type="submit" className="submit">
            Save Changes
          </button>
        </form>
      </div>

    </div>
  );
}
