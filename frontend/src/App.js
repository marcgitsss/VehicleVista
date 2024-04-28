import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ChooseUserTypeModal from "./pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import LoginPage from "./pages/user/user_login/LoginPage";
import ChangePass from "./pages/user/user_login/components/ForgotPass/ChangePass";
import LandingPage from "./pages/user/user_landingpage/user_landingpage";
import Registration from "./pages/user/vehicle_registration/vehicle_registration";
import ChangePassword from "./pages/user/user_login/components/ChangePass/ChangePassword";
import UserStatus from "./pages/user/UserStatus";
import Invoice from "./pages/user/user_login/components/Invoice";
import LoginCard from "./pages/user_login/LoginCard";
import Registration from "./pages/vehicle_registration/vehicle_registration"
import ChooseUserTypeModal from "./pages/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal"; // Import the PayMod component

function App() {
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
          <Route path="/applist" element={<UserStatus />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;