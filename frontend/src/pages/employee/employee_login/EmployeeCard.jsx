import React, { useState, useEffect, useRef } from 'react';
import './employeecard.css';
import axios from 'axios';
import { Typography, CircularProgress  } from '@mui/material';
// import { Link } from 'react-router-dom';

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import VerifyEmailModal from '../../user/user_login/components/VerifyEmail/VerifyEmailModal';
import { useNavigate } from 'react-router-dom';

export default function EmployeeCard({onLoginSuccess }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false); // State for controlling modal
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


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

    setLoading(true);
  
    axios.post('http://localhost:8080/jwt/employee-login', {
      username: loginData.username,
      password: loginData.password
    })
    .then((response) => {
      console.log(response.data);
      if (response.data) {
        onLoginSuccess('Successfully Logged in');
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('email', loginData.username);
        
        setTimeout(() => {
          navigate('/employee-homepage');
        }, 2000); 
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
    })  
    .finally(() => {
      // Set loading to false after the request is complete
      setLoading(false);
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
    <div className="employee-container">
      <div className="employee-form-container">
        <form className="employee-form" onSubmit={handleSubmit}>
          <p className="employee-form-title">Login</p>
          <div className="employee-input-container">
            <input
              type="email"
              placeholder="Email"
              className="employee-input-field"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className="employee-input-container">
            <input
             type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="employee-input-field"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            {showPassword ? (
              <MdVisibilityOff
                onClick={togglePasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={togglePasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
           {/* Snackbar for successful or unsuccessful login */}
      {snackbarOpen && (
        <div className="employee-snackbar">{snackbarMessage}</div>
      )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link to="/verify-email" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontSize: '1rem' }}>Forgot Password?</Typography> </Link> */}
            <Typography sx={{ cursor: 'pointer', fontSize: '1rem' }} onClick={handleForgotPasswordClick}>Forgot Password?</Typography>
          </div>

          <button type="submit" className="employee-submit" style={{ cursor: 'pointer' }}>
          {loading ? <CircularProgress size={24} /> : 'Sign in'}
          </button>
          {/* <p className="employee-signup-link">
            No account? <a href="#">Sign up</a>
          </p> */}
        </form>
      </div>
     
      {/* Render the modal conditionally */}
      {forgotPasswordModalOpen && (
  <VerifyEmailModal onClose={handleCloseModal} />
)}
    </div>
  );
};
