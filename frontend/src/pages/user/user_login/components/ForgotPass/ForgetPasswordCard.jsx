import React, { useState, useEffect, useRef } from 'react';
import './../PassCard.css';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CircularProgress } from '@mui/material';

export default function ForgetPasswordCard() {
  const location = useLocation();
  const { state } = location;
  const email = state.email;
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 


  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleShowSuccess = () => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
       setTimeout(() => {
            navigate('/login');
        }, 2000);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevData => ({
      ...prevData,
      [name]: value
    }));
    //check password
    // Check if confirm new password is being updated

 
      //New
      if (passwordData.newPassword.length < 8) {
        setDisableButton(true);
        setSnackbarMessage("Password must be at least 8 characters long"); // Set error message
        setSnackbarOpen(true);
        return;
      }else{
        setSnackbarOpen(false);
      }

      var passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).*$/;
      if (!passwordRegex.test(passwordData.newPassword)) {
        setDisableButton(true);
        setSnackbarMessage(
          "Password must contain at least one symbol or a capital letter"
        ); // Set error message
        setSnackbarOpen(true);
        return;
      }else{
        setSnackbarOpen(false);
      }
      //New

    if (name === 'confirmNewPassword') {
      // Check if new passwords match


      if (passwordData.newPassword !== value) {
        setDisableButton(true);
        setSnackbarMessage('New passwords do not match.');
        setSnackbarOpen(true);

      }

      else {
        // Close snackbar if passwords match
        setSnackbarOpen(false);

        if (disableButton) {
          setDisableButton(false);
          // setSnackbarMessage('New passwords match.');
          // setSnackbarOpen(true);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!passwordData.newPassword || !passwordData.confirmNewPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    axios.post('http://localhost:8080/jwt/forgot-password', null, {
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
      })
      .finally(() => {
        // Set loading to false after the request is complete
        
        setTimeout(() => {
          setLoading(false);
      }, 2000);
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

            {showNewPassword ? (
              <MdVisibilityOff
                onClick={toggleNewPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleNewPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
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
            {showConfirmNewPassword ? (
              <MdVisibilityOff
                onClick={toggleConfirmNewPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleConfirmNewPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
          {/* Snackbar for successful or unsuccessful password change */}
          {snackbarOpen && (
            <div className="snackbar">{snackbarMessage}</div>
          )}
          {showSuccess && (
            <div className="snackbar">Password reset successfully!</div>
          )}
          <button type="submit" className="submit" disabled={disableButton} onClick={handleShowSuccess} style={{ cursor: disableButton ? 'not-allowed' : 'pointer' }}>
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </button>
        </form>
      </div>

    </div>
  );
}
