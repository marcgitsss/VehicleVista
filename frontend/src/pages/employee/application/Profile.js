import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ redirectPath }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the specified path
    navigate(redirectPath);
  };

  useEffect(() => {
    // Call handleLogout immediately when the component mounts
    handleLogout();
  }, [navigate, redirectPath]);

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
