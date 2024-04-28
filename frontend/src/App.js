import "./App.css";
import LoginCard from "./pages/user_login/LoginCard";
import Registration from "./pages/vehicle_registration/vehicle_registration"
import ChooseUserTypeModal from "./pages/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal"; // Import the PayMod component

function App() {
  return (
    <div >
      <Registration />
      <ChooseUserTypeModal />
    </div>
  );
}

export default App;