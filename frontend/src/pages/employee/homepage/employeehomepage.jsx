import React, { useEffect } from 'react'; // Import useEffect from 'react'
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter'; // Corrected import path for Footer
import employeebackgroundImage from '../../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../../components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employeehomepage.css';
// import EmployeeSidebar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

export default function EmployeeHomepage (){
    const navigate = useNavigate();
    useEffect(() => {
        // Prevent back button functionality
        const handleBackButton = (event) => {
          event.preventDefault();
          navigate("/employee-homepage"); // Navigate to homepage again
        };
    
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener("popstate", handleBackButton);
        
        return () => {
          window.removeEventListener("popstate", handleBackButton);
        };
    }, []); // Pass an empty dependency array

    return (
        <section>
            <Header />
            {/* <EmployeeSidebar /> */}
            <div className='buttons-container'>
                <Link to="/employee-profile"><button className='profileButton'>Profile</button></Link>
                <Link to="/employee-dashboard"><button className='dashboardButton'>Dashboard</button></Link>
                <Link to="/orcr"><button className='employeefeaturesButton'>Employee Features</button></Link>
            </div>

            <div className='employeehomepage'>
                <img src={employeebackgroundImage} alt='employeebackgroundImage' className='employeebackgroundImage' />
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                <Footer />
            </div>
        </section>
    );
};
