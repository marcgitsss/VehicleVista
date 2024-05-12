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
import ChooseUserTypeModal from './pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import LoginPage from './pages/user/user_login/LoginPage';
import ChangePass from './pages/user/user_login/components/ForgotPass/ChangePass';
import LandingPage from './pages/user/user_landingpage/user_landingpage';
import Registration from './pages/user/vehicle_registration/vehicle_registration';
import ChangePassword from './pages/user/user_login/components/ChangePass/ChangePassword';
import OrCr from './pages/employee/application/OrCr';
import AppChoice from './pages/employee/application/AppChoice';
import ApproveApplication from './pages/employee/application/ApproveApplication';
import ProofPayment from './pages/employee/application/ProofPayment';
import SelectOrCr from './pages/employee/application/SelectOrCr';
import VerifyPayment from './pages/employee/application/VerifyPayment';

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

          {/* //Changes */}
          <Route path="/orcr" element={<OrCr />} />
          <Route path="/appchoice" element={<AppChoice />} />
          <Route path="/approve" element={<ApproveApplication />} />
          <Route path="/proofpay" element={<ProofPayment />} />
          <Route path="/selectorcr" element={<SelectOrCr />} />
          <Route path="/verifypay" element={<VerifyPayment />} />
          {/* //Changes */}

          <Route path="/" exact element={<LandingPage />} />
          <Route path="/applist" element={<UserStatus />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
