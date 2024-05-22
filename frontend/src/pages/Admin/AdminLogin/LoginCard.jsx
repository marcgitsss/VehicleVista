import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import VerifyEmailModal from "../../user/user_login/components/VerifyEmail/VerifyEmailModal";
import { useNavigate } from "react-router-dom";
import "./LoginCard.css";

export default function LoginCard({ onLoginSuccess }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setShouldCloseModal(false); // Reset shouldCloseModal state when modal is closed
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!loginData.username || !loginData.password) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarOpen(true);
      return;
    }

    console.log(loginData);

    setLoading(true);

    axios
      .post("http://localhost:8080/jwt/admin-login", {
        username: loginData.username,
        password: loginData.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          onLoginSuccess("Successfully Logged in");
          localStorage.setItem("token", response.data.token);

          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 2000);
        } else {
          setSnackbarMessage("Wrong username or password");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setSnackbarMessage(
          "An error occurred during login. Please try again later."
        );
        setSnackbarOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="admin-login-container">
      <div className="admin-login-form-container">
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <p className="admin-login-form-title">Login</p>
          <div className="admin-login-input-container">
            <input
              type="text"
              placeholder="Username"
              className="admin-login-input-field"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className="admin-login-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="admin-login-input-field"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            {showPassword ? (
              <MdVisibilityOff
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <MdVisibility
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          {/* Snackbar for successful or unsuccessful login */}
          {snackbarOpen && (
            <div className="admin-login-snackbar">{snackbarMessage}</div>
          )}
 

          <button
            type="submit"
            className="admin-login-submit"
            style={{ cursor: "pointer" }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
