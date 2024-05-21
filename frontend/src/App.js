import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import ChooseUserTypeModal from './pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import LoginPage from './pages/user/user_login/LoginPage';
import ChangePass from './pages/user/user_login/components/ForgotPass/ChangePass';
import LandingPage from './pages/user/user_landingpage/user_landingpage';
import Registration from './pages/user/vehicle_registration/vehicle_registration';
import ChangePassword from './pages/user/user_login/components/ChangePass/ChangePassword';

// Import your components here
import ChooseUserTypeModal from "./pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import LoginPage from "./pages/user/user_login/LoginPage";
import ChangePass from "./pages/user/user_login/components/ForgotPass/ChangePass";
import LandingPage from "./pages/user/user_landingpage/user_landingpage";
import Invoice from "./pages/user/user_login/components/Invoice";
import ChangePassword from "./pages/user/user_login/components/ChangePass/ChangePassword";
import OrCr from "./pages/employee/application/OrCr";
import AppChoice from "./pages/employee/application/AppChoice";
import ApproveApplication from "./pages/employee/application/ApproveApplication";
import ProofPayment from "./pages/employee/application/ProofPayment";
import SelectOrCr from "./pages/employee/application/SelectOrCr";
import VerifyPayment from "./pages/employee/application/VerifyPayment";
import EmployeeHomepage from './pages/employee/homepage/employeehomepage';
import EmployeeFeaturePage from './pages/employee/featurepage/employee_featurespage';
import EmployeePage from "./pages/employee/employee_login/EmployeePage";
import UserStatus from "./pages/user/user_homepage/UserStatus";
import UserHomepage from './pages/user/user_homepage/user_homepage';
import RegistrationForm from "./pages/user/vehicle_registration/vehicle_registrationform1";
import UserProfilePage from "./pages/user/user_profile/user_profile/user_profilepage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import EmployeeRoutes from "./Utils/EmployeeRoutes";
import Profile from "./pages/employee/application/Profile"; // Import the Profile component
import AccountExpiration from "./pages/Admin/AccountExpiration/AccountExpiration";
import ApplicationList from "./pages/Admin/ApplicationList/ApplicationList";
import Configuration from "./pages/Admin/Configuration/Configuration";
import StickerPricing from "./pages/Admin/StickerPricing/StickerPricing";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import "./pages/Admin/Admin.css";
import EmployeeProfilePage from "./pages/employee/employee_profile/employee_profilepage";
import EmployeeProfileFinal from "./pages/employee/employee_profile/employee_profilefinal";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard/EmployeeDashboard";
import AdminPage from "./pages/Admin/AdminLogin/AdminLogin";
function App() {
  const [isToken, setIsToken] = useState(false);
  const token = localStorage.getItem('token');
  const [decodedToken, setDecodedToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [exp, setExp] = useState(null);
  const [role, setRole] = useState(null);
  const [expired, setExpired] = useState(false);

  // Function to remove expired token from local storage
  const removeExpiredToken = () => {
    if (expired) {
      localStorage.removeItem('token');
    }
  };

  // Decoding token
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
          setExp(decoded.exp);
          setDecodedToken(decoded);
          setExpired(decoded.exp < Date.now() / 1000);
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    decodeJwt();
  }, [token]);

  // Get role
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.post('http://localhost:8080/jwt/getrole', null, {
            params: { email: email }
          });
          setRole(response.data);
        }
      } catch (error) {
        console.error('Error fetching role data:', error);
      }
    };
    fetchData();
  }, [email]);

  // Update isToken state
  useEffect(() => {
    setIsToken(!!token);
  }, [token]);

  // Remove expired token from local storage
  useEffect(() => {
    removeExpiredToken();
  }, [expired]);

  // Default route function
  const getDefaultRoute = () => {
    if (isToken && !expired) {
      if (role === "USER") {
        return <Navigate to="/homepage" />;
      } else if (role === "EMPLOYEE") {
        return <Navigate to="/employee-homepage" />;
      } else if (role === "ADMIN") {
        return <Navigate to="/admin-dashboard" />;
      }
    }
    return <LandingPage />; // Change this to your landing page component
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/choose-user-type" element={<ChooseUserTypeModal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpass" element={<ChangePass />} />
          <Route path="/changepass" element={<ChangePassword />} />
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/forgotpass" element={<ChangePassPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
