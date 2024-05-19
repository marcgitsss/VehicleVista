import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import "./user_profilepage.css";
import ChangePassword from "./ChangePassword/ChangePassword";
// import ChangePassword from "../components/ChangePass/ChangePassword";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const UserProfilePage = () => {

  // const username = "ludivicombalaterojr@gmail.com";
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const username = decodedToken.sub;

  const [user, setUser] = useState([])
  const [expiration, setExpiration] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [showChangePassword, setShowChangePassword] = useState(false)
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    //MAKE LOGOUT LOGIC
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jwt/get-user', {
          params: {
            username: username
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      try {
        const response = await axios.get('http://localhost:8080/expiration/get-expiration');
        setExpiration(response.data);
      } catch (error) {
        console.error('Error fetching expiration data:', error);
      }

      try {
        const response = await axios.get('http://localhost:8080/vehicles/get-vehicle', {
          params: {
            username: username
          }
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch request if the component unmounts
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div >
      {/* Main Content */}

      <div className="user-profile-container" style={{ margin: '0 auto', paddingBottom: 'clamp(5rem, 5vh, 3rem)', paddingTop: 'clamp(5rem, 5vh, 3rem)',  width: 'clamp(10rem, 100vw, 40rem)' }}>
        <div className="logout-btn" style={{ textAlign: 'right', marginBottom: '1.5%', marginTop: '2%' }}>
          <button
            onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
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
                  <span>{user.fname} {user.mname} {user.lname}</span>
                  <label>Sticker No: {vehicles.stickerId==0?'N/A':vehicles.stickerId}</label>
                </div>
              </div>
              <Typography color={user.isEnabled?"green": "red"}>{user.isEnabled ? "ACTIVE" : "INACTIVE"}</Typography>
            </div>

            <hr />

            <div className="user-profile-details">
              <div className="user-profile-detail">
                <label>Expiration Date</label>
                <span>{user.expirationDate ?? '' ? formatDate(user.expirationDate) : ''}</span>
<span>S.Y. {expiration.currentSchoolYear ?? ''}</span>
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

          <Box
            className="user-profile-box user-profile-email"
            sx={{ boxShadow: 3 }}
          >
            <label>Email</label>
            <span>{user.email}</span>
          </Box>
          <Box
            className="user-profile-box user-profile-number"
            sx={{ boxShadow: 3 }}
          >
            <label>Phone Number</label>
            <span>{user.contactNumber}</span>
          </Box>
          <Box
            className="user-profile-box user-profile-address"
            sx={{ boxShadow: 3 }}
          >
            <label>Address</label>
            <span>{user.address}</span>
          </Box>
          {
            showChangePassword ?
              <ChangePassword setShowChangePassword={setShowChangePassword} />
              :
              <div className="user-profile-box user-profile-changepass" >
                <Button
                  sx={{ color: 'white', backgroundColor: 'green' }}
                  onClick={() => setShowChangePassword(true)}>Change Password</Button>
              </div>
          }

        </Box>
      </div>


    </div>
  );
};

export default UserProfilePage;
