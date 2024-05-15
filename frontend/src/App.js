import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./pages/Admin/Admin.css";
import AccountExpiration from "./pages/Admin/AccountExpiration/AccountExpiration";
import ApplicationList from "./pages/Admin/ApplicationList/ApplicationList";
import Configuration from "./pages/Admin/Configuration/Configuration";
import ParkingManagement from "./pages/Admin/ParkingManagement/ParkingManagement";
import StickerPricing from "./pages/Admin/StickerPricing/StickerPricing";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/account-expiration" element={<AccountExpiration />} />
        <Route path="/application-list" element={<ApplicationList />} />
        <Route path="/parking-management" element={<ParkingManagement />} />
        <Route path="/sticker-pricing" element={<StickerPricing />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
