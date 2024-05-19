import React, { useState, useEffect, useRef } from 'react';
import './logincard.css';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
import VerifyEmailModal from './components/VerifyEmail/VerifyEmailModal';
import { useUser } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function LoginCard() {

  const navigate = useNavigate ();
  const {login} = useUser();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false); // State for controlling modal
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem('token');
  const [decodedToken, setDecodedToken] = useState();
  const [email, setEmail] = useState();
  const [exp, setExp] = useState();

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
    if (!loginData.username && !loginData.password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }else{
      setSnackbarOpen(false);
    }
  
    // Validate email format
    if (!isValidEmail(loginData.username)) {
      setSnackbarMessage('Please enter a valid email address.');
      setSnackbarOpen(true);
      return;
    }else{
      setSnackbarOpen(false);
    }
  
    setLoading(true);
    axios.post('http://localhost:8080/jwt/login', {
      username: loginData.username,
      password: loginData.password
    })
    .then((response) => {
      if (response.data) {
        // Show Snackbar for successful login
        setSnackbarMessage('Successfully Logged in');
        setSnackbarOpen(true);
        localStorage.setItem('token', response.data.token);

        login(response.data.token);
        
        navigate('/homepage');
        // localStorage.setItem('email', loginData.username);

      } else {
        // Show Snackbar for unsuccessful login
        setSnackbarMessage('Wrong email or password');
        setSnackbarOpen(true);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      // Show Snackbar for error during login
      setSnackbarMessage('Wrong email or password');
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

   //decoding token
 useEffect(() => {
  const decodeJwt = async () => {
    if (token) {
      try {
        const response = await axios.post('http://localhost:8080/jwt/decode', null, {
          params: { token: token },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const decoded = response.data.payload;
        setEmail(response.data.payload.sub);
        setExp(decoded.exp);
        setDecodedToken(response.data.payload);
        localStorage.setItem('email', email);
        
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  decodeJwt();
}, [token]);

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
             type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
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
        <div className="snackbar">{snackbarMessage}</div>
      )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link to="/verify-email" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontSize: '1rem' }}>Forgot Password?</Typography> </Link> */}
            <Typography sx={{ cursor: 'pointer', fontSize: '1rem' }} onClick={handleForgotPasswordClick}>Forgot Password?</Typography>
          </div>

          <button type="submit" className="submit">
          {loading ? <CircularProgress size={24} /> : 'Sign in'}
          </button>
          <p className="signup-link">
            No account? <a href="/">Sign up</a>
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
