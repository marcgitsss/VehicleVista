import "./App.css";
import ApplicationList_Admin from "./ApplicationList_Admin/ApplicationList_Admin";
import OrCr from "./Application/OrCr";
import ProofPayment from "./Application/ProofPayment";
import SelectOrCr from "./Application/SelectOrCr";
import VerifyPayment from "./Application/VerifyPayment";
import ApproveApplication from "./Application/ApproveApplication";

function App() {
  return (
    <div className="App">
      {/* <ApplicationList_Admin /> */}

      {/* <ProofPayment /> */}
      {/* <VerifyPayment /> */}
      {/* <OrCr /> */}
      {/* <SelectOrCr /> */}
      <ApproveApplication />
    </div>
  );
}

export default App;
