import React, { useState, useEffect, useRef } from 'react';
import './logincard.css';
import axios from 'axios';
import { Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import VerifyEmailModal from './components/VerifyEmail/VerifyEmailModal';

export default function LoginCard() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false); // State for controlling modal
  const [shouldCloseModal, setShouldCloseModal] = useState(false);



  const handleCloseModal = () => {
    setForgotPasswordModalOpen(false);
    setShouldCloseModal(false); // Reset shouldCloseModal state when modal is closed
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    if (!loginData.username || !loginData.password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }
  
    // Validate email format
    if (!isValidEmail(loginData.username)) {
      setSnackbarMessage('Please enter a valid email address.');
      setSnackbarOpen(true);
      return;
    }
  
    console.log(loginData);
  
    axios.post('http://localhost:8080/jwt/login', {
      username: loginData.username,
      password: loginData.password
    })
    .then((response) => {
      console.log(response.data);
      if (response.data) {
        // Show Snackbar for successful login
        setSnackbarMessage('Successfully Logged in');
        setSnackbarOpen(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', loginData.username);
      } else {
        // Show Snackbar for unsuccessful login
        setSnackbarMessage('Wrong username or password');
        setSnackbarOpen(true);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      // Show Snackbar for error during login
      setSnackbarMessage('An error occurred during login. Please try again later.');
      setSnackbarOpen(true);
    });
  };
  

  // Function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPasswordClick = () => {
    setShouldCloseModal(false); // Reset shouldCloseModal state
    setForgotPasswordModalOpen(true); // Open the forgot password modal
  };
  
  useEffect(() => {
    // Reset the modal state when it's closed
    if (!forgotPasswordModalOpen) {
      setLoginData({ username: '', password: '' });
    }
  }, [forgotPasswordModalOpen]);

  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Login</p>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
           {/* Snackbar for successful or unsuccessful login */}
      {snackbarOpen && (
        <div className="snackbar">{snackbarMessage}</div>
      )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link to="/verify-email" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontSize: '1rem' }}>Forgot Password?</Typography> </Link> */}
            <Typography sx={{ cursor: 'pointer', fontSize: '1rem' }} onClick={handleForgotPasswordClick}>Forgot Password?</Typography>
          </div>

          <button type="submit" className="submit">
            Sign in
          </button>
          <p className="signup-link">
            No account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
     
      {/* Render the modal conditionally */}
      {forgotPasswordModalOpen && (
  <VerifyEmailModal onClose={handleCloseModal} />
)}
    </div>
  );
};
