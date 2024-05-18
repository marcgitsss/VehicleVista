import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const EmployeeRoutes = () => {
  const token = localStorage.getItem('token');
  const [decodedToken, setDecodedToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

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
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
          setIsAuthenticated(false);
        }
      }
    };

    decodeJwt();
  }, [token]);

  useEffect(() => {
    const fetchRole = async () => {
      if (email) {
        try {
          const response = await axios.post('http://localhost:8080/jwt/getrole', null, {
            params: { email: email }
          });
          setRole(response.data.role); // Assuming response.data contains the role information
        } catch (error) {
          console.error('Error fetching role data:', error);
          setIsAuthenticated(false);
        }
      }
    };

    fetchRole();
  }, [email]);

  useEffect(() => {
    if (role) {
      if (role !== "EMPLOYEE") {
        setIsAuthenticated(false);
      }
    }
  }, [role]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/employee-login" />;
};

export default EmployeeRoutes;
