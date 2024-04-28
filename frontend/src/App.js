import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ChooseUserTypeModal from "./pages/user/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal";
import LoginPage from "./pages/user/user_login/LoginPage";
import ChangePass from "./pages/user/user_login/components/ForgotPass/ChangePass";
import LandingPage from "./pages/user/user_landingpage/user_landingpage";
import ChangePassword from "./pages/user/user_login/components/ChangePass/ChangePassword";
import UserStatus from "./pages/user/user_homepage/UserStatus";
import Invoice from "./pages/user/user_login/components/Invoice";
import VehicleRegistration from './pages/vehicle_registration/vehicle_registration';
import PayMod from './pages/vehicle_registration/payMod';
import UserHomepage from './pages/user/user_homepage/user_homepage';
import RegistrationForm1 from "./pages/user/vehicle_registration/vehicle_registrationform";
import RegistrationForm from "./pages/user/vehicle_registration/vehicle_registrationform1";
import UserProfilePage from "./pages/user/user_profile/user_profile/user_profilepage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import LoginCard from "./pages/user_login/LoginCard";
import Registration from "./pages/vehicle_registration/vehicle_registration"

function App() {
  return (
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" exact element={<LandingPage />} />

          {/* <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/choose-user-type" element={<ChooseUserTypeModal />} /> */}
          
          {/* <Route path="/forgotpass" element={<ChangePass />} />
          <Route path="/changepass" element={<ChangePassword />} /> */}
          
          {/* <Route path="/applist" element={<UserStatus />} />
          <Route path="/invoice" element={<Invoice />} /> */}
          {/* <Route path="/homepage" element={<UserHomepage />} /> */}
          {/* <Route path="/profile" element={<UserProfilePage />} /> */}

          {/* Private Routes  */}
          <Route element={<PrivateRoutes/>} >
              <Route element={<UserHomepage />} path='/homepage' exact/>
              <Route element={<RegistrationForm />} path='/registration' exact/>
              <Route element={<ChooseUserTypeModal />} path='/choose-user-type' exact/>
              <Route element={<ChangePass />} path='/forgotpass' exact/>
              <Route element={<ChangePassword />} path='/applist' exact/>
              <Route element={<Invoice />} path='/invoice' exact/>
              <Route element={<UserProfilePage />} path='/profile' exact/>

            </Route>
        </Routes>
      

  );
}

export default App;