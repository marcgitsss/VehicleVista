import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import "./user_profilepage.css";
import ChangePassword from "./ChangePassword/ChangePassword";

const UserProfilePage = () => {
  return (
    <div>
     

      {/* Main Content */}
      <div className="user-profile-container">
        <Box className="user-profile-outer">
          <Box
            className="user-profile-box user-profile-main"
            sx={{ boxShadow: 3 }}
          >
            <div className="user-profile-status">
              <div className="user-profile-avatar">
                <Avatar sx={{ bgcolor: "purple" }}>S</Avatar>
                <div className="user-profile-name">
                  <label>Name</label>
                  <span>SAN JUAN IRISH LEIGH</span>
                  <label>Sticker No.: 123</label>
                </div>
              </div>
              <Typography color={"green"}>ACTIVE</Typography>
            </div>

            <hr />

            <div className="user-profile-details">
              <div className="user-profile-detail">
                <label>Expiration Date</label>
                <span>DECEMBER 12, 2024</span>
                <span>S.Y. 2023-2024</span>
              </div>
              <div className="user-profile-detail">
                <label>Registration Type</label>
                <span>4 - WHEELS</span>
                <span>Pick-up/Drop-off</span>
              </div>
              <div className="user-profile-detail">
                <label>Vehicle Type</label>
                <span>HONDA CLICK</span>
                <span>GED 1234</span>
              </div>
            </div>
          </Box>

          <Box
            className="user-profile-box user-profile-email"
            sx={{ boxShadow: 3 }}
          >
            <label>Email</label>
            <span>sanjuanirishleigh1234@gmail.com</span>
          </Box>
          <Box
            className="user-profile-box user-profile-number"
            sx={{ boxShadow: 3 }}
          >
            <label>Phone Number</label>
            <span>+63 915 669 4676</span>
          </Box>
          <Box
            className="user-profile-box user-profile-address"
            sx={{ boxShadow: 3 }}
          >
            <label>Address</label>
            <span>123 Street, Cebu City, Cebu, 6000</span>
          </Box>

          <ChangePassword />

        </Box>
      </div>

     
    </div>
  );
};

export default UserProfilePage;
