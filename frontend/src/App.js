import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

function App() {
  return (
        <Routes>
          {/* Public Routes */}
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
          <Route path="/employee-login" element={<EmployeePage />} />
          <Route path="/employee-homepage" element={<EmployeeHomepage />} />
          <Route path="/employee-featurepage" element={<EmployeeFeaturePage />} />
          {/* //Changes */}

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
