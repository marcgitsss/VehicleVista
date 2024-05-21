import React, { useState, useEffect } from 'react';
import './../PassCard.css';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function PassCard() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('token');

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
          setEmail(decoded.sub);
          console.log('Decoded JWT:', decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    decodeJwt();
  }, [token]);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
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
    console.log("Password data:", passwordData);

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setSnackbarMessage('New passwords do not match.');
      setSnackbarOpen(true);
      return;
    }

    console.log("Submitting password change request...");

    // try {
    //   const response = await axios.post('http://localhost:8080/jwt/change-password', {
    //     username: email,
    //     oldPassword: passwordData.oldPassword,
    //     newPassword: passwordData.newPassword,
    //     confirmPassword: passwordData.confirmNewPassword
    //   });
    //   console.log("Response:", response.data);

    //   if (response.data) {
    //     setSnackbarMessage('Password changed successfully');
    //     setSnackbarOpen(true);
    //     setPasswordData({
    //       oldPassword: '',
    //       newPassword: '',
    //       confirmNewPassword: ''
    //     });
    //   } else {
    //     setSnackbarMessage(response.data.message);
    //     setSnackbarOpen(true);
    //   }
    // } catch (error) {
    //   console.error('Error during password change:', error);
    //   setSnackbarMessage('An error occurred while changing password. Please try again later.');
    //   setSnackbarOpen(true);
    // }
  };

  return (
    <div className="change-password-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Change Password</p>
          <div className="input-container">
            <input
              type={oldPasswordVisibility ? "text" : "password"}
              placeholder="Enter old password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInputChange}
            />
            {oldPasswordVisibility ? (
              <MdVisibilityOff
                onClick={toggleOldPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleOldPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
          <div className="input-container">
            <input
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter new password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
            />
            {passwordVisibility ? (
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
          <div className="input-container">
            <input
              type={confirmPasswordVisibility ? "text" : "password"}
              placeholder="Confirm new password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleInputChange}
            />
            {confirmPasswordVisibility ? (
              <MdVisibilityOff
                onClick={toggleConfirmPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleConfirmPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
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
