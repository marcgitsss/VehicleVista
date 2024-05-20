import React, { useState } from "react";
import backgroundImage from "../../../assets/HP_Background.jpg";
// import CarparkImg from "../../../assets/Carpark.png";

import Header from "../../../components/Navbar/EmployeeHeader";
// import EmployeeSidebar from "../../../components/EmployeeSidebar/EmployeeSidebar";
import EmployeeSidebar from "../../../components/Navbar/EmployeeSidebar/employeeSidebar";
// import EmployeeFooter from "../../../components/EmployeeFooter/EmployeeFooter";
import Footer from "../../../components/Navbar/UserFooter";
import "./EmployeeDashboard.css";
import LineChart from "./LineChart";
import VehicleCountPieChart from "./CountPieChart";

const EmployeeDashboard = () => {
  return (
    <>
      {/* Components */}
      <Header />
      <img
        src={backgroundImage}
        alt="backgroundImage"
        className="ed-background-image"
      />
      <EmployeeSidebar />

      {/* Main Content */}
      <div className="ed-container" >
        <h1>Dashboard</h1>
        <div className="ed-row-1">
          <div className="ed-item-1">
            <span>Total Vehicles:</span>
            <span>110</span>
          </div>
          <div className="ed-item-2">
            <span>Total 4-Wheelers:</span>
            <span>30</span>
          </div>
          <div className="ed-item-3">
            <span>Total 2-Wheelers:</span>
            <span>80</span>
          </div>
          <div className="ed-item-4">
            <span>Daily Limit:</span>
            <span>1200</span>
          </div>
        </div>

        <div className="ed-row-2">
          <div className="ed-item-5">
            <span>Count of Vehicles</span>
            <VehicleCountPieChart />
          </div>
          <div className="ed-item-6">
            <span>Graph</span>
            <LineChart />
          </div>
        </div>

        {/* <div className="ed-row-3">
          <div className="ed-item-7">
            <span>Parking Area 1</span>
            <img
              src={CarparkImg}
              alt="Car Park Icon"
              className="ed-park-icon"
            />
            <span>Space: 36</span>
          </div>
          <div className="ed-item-8">
            <span>Parking Area 2</span>
            <img
              src={CarparkImg}
              alt="Car Park Icon"
              className="ed-park-icon"
            />
            <span>Space: 40</span>
          </div>
          <div className="ed-item-9">
            <span>Parking Area 3</span>
            <img
              src={CarparkImg}
              alt="Car Park Icon"
              className="ed-park-icon"
            />
            <span>Space: 10</span>
          </div>
        </div> */}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </div>
    </>
  );
};

export default EmployeeDashboard;
