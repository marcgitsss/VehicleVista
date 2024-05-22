import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import "./user_profilepage.css";
import ChangePassword from "./ChangePassword/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const token = localStorage.getItem("token");
  const [decodedToken, setDecodedToken] = useState(null);
  const [username, setUserName] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [expiration, setExpiration] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Decoding Token
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
          setUserName(decoded.sub);
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    decodeJwt();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/jwt/get-user', {
          params: {
            username: username
          }
        });
        setUser(userResponse.data);

        const expirationResponse = await axios.get('http://localhost:8080/config/get-expiration');
        setExpiration(expirationResponse.data);

        const vehiclesResponse = await axios.get('http://localhost:8080/vehicles/find-by-username/'+username);
        setVehicles(vehiclesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div>
      {/* Main Content */}
      <div className="user-profile-container">
        <div className="logout-btn" style={{ textAlign: 'right', marginBottom: '1.5%', marginTop: '2%' }}>
          <button onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
        <Box className="user-profile-outer">
          <Box className="user-profile-box user-profile-main" sx={{ boxShadow: 3 }}>
            <div className="user-profile-status">
              <div className="user-profile-avatar">
                <Avatar sx={{ bgcolor: "purple" }}>S</Avatar>
                <div className="user-profile-name">
                  <label>Name</label>
                  <span>{`${user.fname} ${user.mname} ${user.lname}`}</span>
                  <label>Sticker No: {vehicles.stickerId === 0 ? 'N/A' : vehicles.stickerId}</label>
                </div>
              </div>
              <Typography color={user.isEnabled ? "green" : "red"}>{user.isEnabled ? "ACTIVE" : "INACTIVE"}</Typography>
            </div>

            <hr />

            <div className="user-profile-details">
              <div className="user-profile-detail">
                <label>Expiration Date</label>
                <span>{user.expirationDate ? formatDate(user.expirationDate) : ''}</span>
                <span>S.Y. {expiration.currentSchoolYear || ''}</span>
              </div>
              <div className="user-profile-detail">
                <label>Registration Type</label>
                <span>
                  {vehicles?.isFourWheel !== null && vehicles?.isFourWheel !== undefined
                    ? (vehicles.isFourWheel ? "4-Wheel Vehicle" : "2-Wheel Vehicle")
                    : ''}
                </span>
                <span>
                  {vehicles?.isParking !== null && vehicles?.isParking !== undefined
                    ? (vehicles.isParking ? "Parking" : "Pick-up/Drop-off")
                    : ''}
                </span>
              </div>
              <div className="user-profile-detail">
                <label>Vehicle Type</label>
                <span>{vehicles.vehicleMake}</span>
                <span>{vehicles.plateNo}</span>
              </div>
            </div>
          </Box>

          <Box className="user-profile-box user-profile-email" sx={{ boxShadow: 3 }}>
            <label>Email</label>
            <span>{user.email}</span>
          </Box>
          <Box className="user-profile-box user-profile-number" sx={{ boxShadow: 3 }}>
            <label>Phone Number</label>
            <span>{user.contactNumber}</span>
          </Box>
          <Box className="user-profile-box user-profile-address" sx={{ boxShadow: 3 }}>
            <label>Address</label>
            <span>{user.address}</span>
          </Box>
          {showChangePassword ? (
            <ChangePassword setShowChangePassword={setShowChangePassword} />
          ) : (
            <div className="user-profile-box user-profile-changepass">
              <Button sx={{ color: 'white', backgroundColor: 'green' }} onClick={() => setShowChangePassword(true)}>
                Change Password
              </Button>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};

export default UserProfilePage;
