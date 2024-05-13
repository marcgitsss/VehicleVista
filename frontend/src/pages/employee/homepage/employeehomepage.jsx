import React from 'react';
import Header from '../../../components/Navbar/UserHeader'; // Corrected import path for Header
import Footer from '../../../components/Navbar/UserFooter'; // Corrected import path for Footer
import employeebackgroundImage from '../../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../../components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employeehomepage.css';
import EmployeeSidebar from '../../../components/EmployeeSidebar/employeeSidebar';
import { Link } from 'react-router-dom';

const EmployeeHomepage = () => {

    return (
        <section>
            <Header />
            <EmployeeSidebar />
            <div className='buttons-container'>
                <button className='profileButton'>Profile</button>
                <button className='dashboardButton'>Dashboard</button>
                <Link to="/employee-featurepage"><button className='employeefeaturesButton'>Employee Features</button></Link>
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

export default EmployeeHomepage;