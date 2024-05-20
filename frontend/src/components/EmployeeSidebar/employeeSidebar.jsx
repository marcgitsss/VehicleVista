import React, { useEffect, useState } from 'react';
import './employeeSidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';

function EmployeeSidebar({ activeMenuItem }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize isMobile state based on initial viewport width
  const [Open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!Open);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile state when viewport size changes
    };

    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    };
  }, []);

  return (
    <>
        {isMobile ? (
          <>

            <Button sx={{ color: "black", marginLeft: "0.5rem", marginTop: "0rem", marginBottom: "0rem", zIndex: "1000" }} onClick={handleClick}><FaBars /></Button>
            {Open ?
              <div className={`employee-sidebar ${isMobile ? 'mobile' : ''}`}>
                <ul className="employee-sidebar-menu">
                  <li className={activeMenuItem === "Home" ? "active" : ""}>
                    <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <div onClick={() => { if (location.pathname !== "/employee-homepage") window.location.href = "/employee-homepage"; }}>
                      Homepage
                    </div>
                  </li>
                  <li className={activeMenuItem === "Registration" ? "active" : ""}>
                    <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <div onClick={() => { if (location.pathname !== "/orcr") window.location.href = "/orcr"; }}>
                      Verify OR/CR <br /> and License
                    </div>
                  </li>
                  <li className={activeMenuItem === "Profile" ? "active" : ""}>
                    <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <div onClick={() => { if (location.pathname !== "/verifypay") window.location.href = "/verifypay"; }}>
                      Verify Proof <br /> of Payment
                    </div>
                  </li>
                  <li className={activeMenuItem === "Payment" ? "active" : ""}>
                    <PaymentIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <div onClick={() => { if (location.pathname !== "/approve") window.location.href = "/approve"; }}>
                      Approve <br /> Applications
                    </div>
                  </li>
                </ul>
              
                </div>: null}
          </>
        ) : (
          <>
            <div className={`employee-sidebar ${isMobile ? 'mobile' : ''}`}>
              <ul className="employee-sidebar-menu">
                <li className={activeMenuItem === "Home" ? "active" : ""}>
                  <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <div onClick={() => { if (location.pathname !== "/employee-homepage") window.location.href = "/employee-homepage"; }}>
                      Homepage
                    </div>
                </li>
                <li className={activeMenuItem === "Registration" ? "active" : ""}>
                  <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <div onClick={() => { if (location.pathname !== "/orcr") window.location.href = "/orcr"; }}>
                    Verify OR/CR <br /> and License
                  </div>
                </li>
                <li className={activeMenuItem === "Profile" ? "active" : ""}>
                  <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <div onClick={() => { if (location.pathname !== "/verifypay") window.location.href = "/verifypay"; }}>
                    Verify Proof <br /> of Payment
                  </div>
                </li>
                <li className={activeMenuItem === "Payment" ? "active" : ""}>
                  <PaymentIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <div onClick={() => { if (location.pathname !== "/approve") window.location.href = "/approve"; }}>
                    Approve <br /> Applications
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
    </>
  );
}

export default EmployeeSidebar;
