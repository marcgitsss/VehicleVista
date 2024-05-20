import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoutes = () => {
  // const { token } = useUser(); // Assuming this is how you get the token from your AuthProvider
  const token = localStorage.getItem('token');
  const [decodedToken, setDecodedToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [expired, setExpired] = useState(false);
  // Initialize isAuthenticated based on the presence of the token
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
          setExpired(decoded.exp < Date.now() / 1000);
          setIsAuthenticated(true);
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
      if (role !== "USER") {
        setIsAuthenticated(false);
      }
    }
  }, [role]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
