import { Box, Button, TextField, CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import './ChangePassword.css';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

/**
 * Validation:
 * 1. new password, confirm new password must match
 * 2. must 1 uppercase and 1 special character
 * 3. must not have spaces
 */
const ChangePassword = ({ setShowChangePassword }) => {
  const [loading, setLoading] = useState(false); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // FOR TESTING CHANGE EMAIL LANG
  // const username  = "jessreygarrido22@gmail.com"; 
  const token = localStorage.getItem('token');
  const decondedToken = jwtDecode(token);
  const email = decondedToken.sub;
  // const email = localStorage.getItem('email');
  console.log('email:', email);
  //  localStorage.removeItem('email');

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

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

    if (whitespaceRegex.test(newPassword)) {
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
      username: email,
      oldPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };
    console.log('data', data);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/jwt/change-password',
        {
          username: email,
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmNewPassword,
        }
      );
      console.log(res.data);
      setSnackbarOpen(true);
      setSnackbarMessage("Password changed successfully!");
      setTimeout(() => {
        setShowSuccess(true);
      }, 500);
      setTimeout(() => {
        setShowSuccess(false);
        setShowChangePassword(false);
      }, 2500);
    } catch (error) {
      console.error('There was an error making the POST request!', error);
      setSnackbarOpen(true);
      setSnackbarMessage("There was an error changing the password.");
    } finally {
      
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }



    setSnackbarOpen(false);



  }

  const resetButton = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setShowChangePassword(false);
  }

  return (
    <>
      <Box className="user-profile-box" component="form" onSubmit={onSubmit}>
        <div className="up-changepass">

          <div style={{ position: 'relative' }}>
            <h2>Change Password</h2>
            <TextField id="outlined-basic" label="Current Password" variant="outlined" required
              value={currentPassword}
              type={oldPasswordVisibility ? "text" : "password"}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {oldPasswordVisibility ? (
              <MdVisibilityOff
                onClick={toggleOldPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(150%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleOldPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(150%)', cursor: 'pointer' }}
              />
            )}
          </div>


          <div style={{ position: 'relative' }}>
            <TextField id="outlined-basic" label="New Password" variant="outlined" required
              value={newPassword}
              type={passwordVisibility ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordVisibility ? (
              <MdVisibilityOff
                onClick={togglePasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={togglePasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>


          <div style={{ position: 'relative' }}>
            <TextField id="outlined-basic" label="Confirm New Password" variant="outlined" required
              value={confirmNewPassword}
              type={confirmPasswordVisibility ? "text" : "password"}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {confirmPasswordVisibility ? (
              <MdVisibilityOff
                onClick={toggleConfirmPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            ) : (
              <MdVisibility
                onClick={toggleConfirmPasswordVisibility}
                style={{ position: 'absolute', top: '50%', right: '2rem', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>
          {showSuccess && (
            <div className="snackbar">Password changed successfully!</div>
          )}

          <div className="up-button-container">
            <Button variant="text" onClick={resetButton}>Cancel</Button>
            <Button variant="contained" type="submit" >{loading ? <CircularProgress size={24} sx={{ color: 'green' }}/> : 'Save'}</Button>
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