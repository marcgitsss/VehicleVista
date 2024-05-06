import React, { useState, useEffect, useRef } from 'react';
import './PassCard.css';
import axios from 'axios';

export default function PassCard() {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');
    
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
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
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
        axios.post('http://localhost:8080/change-password', {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            // Show Snackbar for successful password change
            setSnackbarMessage('Password changed successfully');
            setSnackbarOpen(true);
            // Clear input fields
            setPasswordData({
              oldPassword: '',
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
              <p className="form-title">Change Password</p>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Enter old password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handleInputChange}
                />
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
