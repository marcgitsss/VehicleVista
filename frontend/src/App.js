
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ChooseUserTypeModal from "./pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import LoginPage from "./pages/user/user_login/LoginPage";
import ChangePass from "./pages/user/user_login/components/ForgotPass/ChangePass";
import LandingPage from "./pages/user/user_landingpage/user_landingpage";
import Invoice from "./pages/user/user_login/components/Invoice";
import Registration from './pages/user/vehicle_registration/vehicle_registration';
import ChangePassword from './pages/user/user_login/components/ChangePass/ChangePassword';
import OrCr from './pages/employee/application/OrCr';
import AppChoice from './pages/employee/application/AppChoice';
import ApproveApplication from './pages/employee/application/ApproveApplication';
import ProofPayment from './pages/employee/application/ProofPayment';
import SelectOrCr from './pages/employee/application/SelectOrCr';
import VerifyPayment from './pages/employee/application/VerifyPayment';
import EmployeeHomepage from './pages/employee/homepage/employeehomepage';
import EmployeeFeaturePage from './pages/employee/featurepage/employee_featurespage';
import EmployeePage from "./pages/employee/employee_login/EmployeePage";
import UserStatus from "./pages/user/user_homepage/UserStatus";
import VehicleRegistration from './pages/vehicle_registration/vehicle_registration';
import PayMod from './pages/vehicle_registration/payMod';
import UserHomepage from './pages/user/user_homepage/user_homepage';
import RegistrationForm1 from "./pages/user/vehicle_registration/vehicle_registrationform";
import RegistrationForm from "./pages/user/vehicle_registration/vehicle_registrationform1";
import UserProfilePage from "./pages/user/user_profile/user_profile/user_profilepage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import axios from "axios";
import EmployeeRoutes from "./Utils/EmployeeRoutes";
import Profile from "./pages/employee/application/Profile"; // Import the Profile component
import AccountExpiration from "./pages/Admin/AccountExpiration/AccountExpiration";
import ApplicationList from "./pages/Admin/ApplicationList/ApplicationList";
import Configuration from "./pages/Admin/Configuration/Configuration";
import StickerPricing from "./pages/Admin/StickerPricing/StickerPricing";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import "./pages/Admin/Admin.css";


function App() {
  const [isToken, setIsToken] = useState(false);
  const token = localStorage.getItem('token');
  const [decodedToken, setDecodedToken] = useState();
  const [email, setEmail] = useState();
  const [exp, setExp] = useState();
  const [role, setRole] = useState();

  //decoding token
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
          setEmail(response.data.payload.sub);
          setExp(decoded.exp);
          setDecodedToken(response.data.payload);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    decodeJwt();
  }, [token]);
// get role
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.post('http://localhost:8080/jwt/getrole', null, {
            params: {
              email: email
            }
          });
          setRole(response.data);
        }
      } catch (error) {
        console.error('Error fetching role data:', error);
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    setIsToken(!!token);
  }, [token]);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login';
  };

  const getDefaultRoute = () => {
    if (isToken) {
      if (role === "USER") {
        return <Navigate to="/homepage" />;
      } else if (role === "EMPLOYEE") {
        return <Navigate to="/employee-homepage" />;
      }
    }
    return <LandingPage />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isToken ? <LoginPage /> : getDefaultRoute()} />
        <Route path="/forgotpass" element={!isToken ? <ChangePass /> : getDefaultRoute()} />
        <Route path="/changepass" element={!isToken ? <ChangePassword /> : getDefaultRoute()} />
        <Route path="/" element={getDefaultRoute()} />
        <Route path="/employee-login" element={!isToken ? <EmployeePage /> : getDefaultRoute()} />
        <Route path="/logout" element={<Profile redirectPath="/login" />} /> {/* Add logout route */}
        <Route path="/employee-logout" element={<Profile redirectPath="/employee-login" />} /> {/* Add employee logout route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/account-expiration" element={<AccountExpiration />} />
          <Route path="/application-list" element={<ApplicationList />} />
          <Route path="/sticker-pricing" element={<StickerPricing />} />
          <Route path="/user-management" element={<UserManagement />} />

        {/* Employee Routes */}
        <Route element={<EmployeeRoutes />}>
          <Route path="/employee-homepage" element={<EmployeeHomepage />} />
          <Route path="/employee-featurepage" element={<EmployeeFeaturePage />} />
          <Route path="/employee-profile" element={<Profile />} />
          <Route path="/orcr" element={<OrCr />} />
          <Route path="/appchoice" element={<AppChoice />} />
          <Route path="/approve" element={<ApproveApplication />} />
          <Route path="/proofpay" element={<ProofPayment />} />
          <Route path="/selectorcr" element={<SelectOrCr />} />
          <Route path="/verifypay" element={<VerifyPayment />} />
        </Route>

        {/* Private User Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/homepage" element={<UserHomepage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/choose-user-type" element={<ChooseUserTypeModal />} />
          <Route path="/applist" element={<UserStatus />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
