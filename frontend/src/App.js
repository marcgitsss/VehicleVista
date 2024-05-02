import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationList_Admin from "./ApplicationList_Admin/ApplicationList_Admin";
import UserHomepage from './pages/user/user_homepage/user_homepage';
import AboutUs from './user_aboutus';
import EmployeeHomepage from "./pages/employee/employee_homepage";
import EmployeeFeaturesPage from "./pages/employee/employee_featurespage";
import StudentSidebar from "./components/StudentSidebar/StudentSidebar";
import UserAnnouncement from "./pages/user/user_homepage/announcement";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin" element={<ApplicationList_Admin />} />
          <Route path="/user_homepage" element={<UserHomepage />} /> 
          <Route path="/user_aboutus" element={<AboutUs />} /> 
          <Route path="/employee_homepage" element={<EmployeeHomepage />} /> 
          <Route path="/employee_featurespage" element={<EmployeeFeaturesPage />} /> 
          <Route path="/student_sidebar" element={<StudentSidebar />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;