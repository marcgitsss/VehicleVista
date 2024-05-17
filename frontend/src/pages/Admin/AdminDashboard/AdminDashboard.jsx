import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [allApplicants, setAllApplicants] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [total4Wheelers, setTotal4Wheelers] = useState(0);
  const [total2Wheelers, setTotal2Wheelers] = useState(0);

  const getAllApplicant = async () => {
    try {
      const res = await axios.get("http://localhost:8080/applicants/all");
      setAllApplicants(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllApplicant();
  }, []);

  useEffect(() => {
    let total4W = 0;
    let total2W = 0;

    allApplicants.forEach((applicant) => {
      if (applicant.isFourWheel) {
        total4W++;
      } else {
        total2W++;
      }
    });
    setTotal4Wheelers(total4W);
    setTotal2Wheelers(total2W);
  }, [allApplicants]);

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>

          <div className="admin-dash-container">
            <div className="admin-dash-box">
              <div>
                <span>Total Vehicles</span>
                <span>{allApplicants.length}</span>
              </div>
              <StackedBarChartIcon />
            </div>

            <div className="admin-dash-box">
              <div>
                <span>Total 4 Wheelers</span>
                <span>{total4Wheelers}</span>
              </div>
              <DirectionsCarIcon />
            </div>

            <div className="admin-dash-box">
              <div>
                <span>Total 2 Wheelers</span>
                <span>{total2Wheelers}</span>
              </div>
              <TwoWheelerIcon />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
