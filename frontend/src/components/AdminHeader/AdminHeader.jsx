import React, { useState } from "react";
import "./AdminHeader.css";
import { Avatar, Typography, IconButton, Box, Snackbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CITLogo from "../../assets/cit-logo 1.png";
import { useNavigate } from "react-router-dom";


export default function AdminHeader() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    // Logout Logic..
    setSnackbarMessage("You have successfully Logged out.");
    setSnackbarOpen(true);
    console.log("here");
    setTimeout(() => {
      navigate("/admin-login");
    }, 2000);
  };
  return (
    <>
      <div className="admin-header">
        <div className="admin-logo">
          <img src={CITLogo} alt="" height={45} />
        </div>
        <div className="admin-controls">
          <div className="admin-username">
            <Typography>
              {" "}
              <span className="admin-username-text">Hello</span>, Admin
            </Typography>
          </div>
          <div className="admin-pic">
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0J0F_5w-2n4HotHSW18iVR0KcR6lJLPxfYQ7rDxEgA&s"
                />
              </IconButton>
              <IconButton sx={{ ml: "2rem" }} onClick={handleLogout}>
                <LogoutIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </div>
        </div>
      </div>
      <Snackbar 
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={()=>setSnackbarOpen(false)}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
    </>
  );
}
