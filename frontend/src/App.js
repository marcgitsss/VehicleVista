import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./pages/Admin/Admin.css";
import AccountExpiration from "./pages/Admin/AccountExpiration/AccountExpiration";
import ApplicationList from "./pages/Admin/ApplicationList/ApplicationList";
import Configuration from "./pages/Admin/Configuration/Configuration";
import StickerPricing from "./pages/Admin/StickerPricing/StickerPricing";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/account-expiration" element={<AccountExpiration />} />
        <Route path="/application-list" element={<ApplicationList />} />
        <Route path="/sticker-pricing" element={<StickerPricing />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
