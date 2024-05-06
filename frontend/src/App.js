import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ChooseUserTypeModal from './pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import LoginPage from './pages/user/user_login/LoginPage';
import ChangePass from './pages/user/user_login/ChangePass';
import LandingPage from './pages/user/user_landingpage/user_landingpage';
import Registration from './pages/user/vehicle_registration/vehicle_registration';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/choose-user-type" element={<ChooseUserTypeModal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpass" element={<ChangePass />} />
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
