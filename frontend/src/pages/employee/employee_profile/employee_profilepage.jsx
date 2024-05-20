import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import "./employee_profilepage.css";
import ChangePassword from "./ChangePassword/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeProfilePage = () => {
  const token = localStorage.getItem("token");
  const username = 'sanjuanirishleigh09@gmail.com'
  const [employee, setEmployee] = useState([]);
  const [expiration, setExpiration] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/employee-login");
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/jwt/get-employee",
          {
            params: {
              username: username,
            },
          }
        );
        setEmployee(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/expiration/get-expiration"
        );
        setExpiration(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching expiration data:", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/vehicles/get-vehicle",
          {
            params: {
              username: username,
            },
          }
        );
        setVehicles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div>
      <div className="employee-profile-container">
        <div className="logout-btn" style={{ textAlign: "right", marginBottom: "1.5%", marginTop: "2%" }}>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
        <Box className="employee-profile-outer">
          <Box
            className="employee-profile-box employee-profile-main"
            sx={{ boxShadow: 3 }}
          >
            <div className="employee-profile-status">
              <div className="employee-profile-avatar">
                <Avatar sx={{ bgcolor: "purple" }}>S</Avatar>
                <div className="employee-profile-name">
                  <label>Name</label>
                  <Typography>NAME HERE</Typography>
                </div>
              </div>
            </div>
          </Box>

          <Box
            className="employee-profile-box employee-profile-email"
            sx={{ boxShadow: 3 }}
          >
            <label>Email</label>
            <span>{employee.email}</span>
          </Box>

          {showChangePassword ? (
            <ChangePassword setShowChangePassword={setShowChangePassword} />
          ) : (
            <div className="employee-profile-box employee-profile-changepass">
              <Button
                sx={{ color: "white", backgroundColor: "green" }}
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
            </div>
          )}
        </Box>
      </div>
      <Modal
        open={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box className="logout-modal" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper',boxShadow: 24, p: 4 }}>
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Are you sure you want to log out?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
            <Button onClick={handleConfirmLogout}>Yes</Button>
            <Button onClick={handleCloseLogoutModal}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeProfilePage;
