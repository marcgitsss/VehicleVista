import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Registration from "./pages/vehicle_registration/vehicle_registration";
import ChooseUserTypeModal from "./pages/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import LoginPage from "./pages/user_login/LoginPage";
import LandingPage from "./pages/user_landingpage/user_landingpage";
import ChangePassPage from './pages/user_login/ChangePassPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/choose-user-type" element={<ChooseUserTypeModal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="forgotpass" element={<ChangePass />} />
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/forgotpass" element={<ChangePassPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
