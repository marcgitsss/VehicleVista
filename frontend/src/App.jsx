import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Admin/Admin.css";
import AccountExpiration from "./Admin/AccountExpiration/AccountExpiration";
import ApplicationList from "./Admin/ApplicationList/ApplicationList";
import Configuration from "./Admin/Configuration/Configuration";
import ParkingManagement from "./Admin/ParkingManagement/ParkingManagement";
import StickerPricing from "./Admin/StickerPricing/StickerPricing";
import UserManagement from "./Admin/UserManagement/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<>Dashboard Page</>}/> */}
        <Route path="/" element={<Configuration />}/>
        <Route path="/account-expiration" element={<AccountExpiration />}/>
        <Route path="/application-list" element={<ApplicationList />}/>        
        <Route path="/parking-management" element={<ParkingManagement />}/>
        <Route path="/sticker-pricing" element={<StickerPricing />}/>
        <Route path="/user-management" element={<UserManagement />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
