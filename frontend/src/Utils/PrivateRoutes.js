import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // const { token } = useUser(); // Assuming this is how you get the token from your AuthProvider
  const token = localStorage.getItem("token");
  // Initialize isAuthenticated based on the presence of the token
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Update isAuthenticated based on the presence of the token
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!storedToken);

  }, []); // Removed token from the dependency array

  // If authenticated, render the nested routes, else navigate to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
