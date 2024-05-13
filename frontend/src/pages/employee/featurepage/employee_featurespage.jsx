import React from 'react';
import Header from '../../../components/Navbar/UserHeader'; // Corrected import path for Header
import Footer from '../../../components/Navbar/UserFooter'; // Corrected import path for Footer
import employeebackgroundImage from '../../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../../components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employee_featurespage.css';
import EmployeeSidebar from '../../../components/EmployeeSidebar/employeeSidebar';

const EmployeeFeaturePage = () => {
  
  return (
    <section>
      <Header />
        <EmployeeSidebar />
      <div className='employeefeaturespagebuttons-container'>
        <button className='fdashboardButton'>Dashboard</button>
        <button className='verifyorcrdButton'>Verify OR/CR and License</button>
        
      </div>

      <div className='employeefeaturespagebuttons2-container'>
        <button className='verifyproofofpaymentButton'>Verify Proof Of Payment</button>
        <button className='approveapplicationButton'>Approve Application </button>
      </div>

      <div className='employeefeaturespage'>
        <img src={employeebackgroundImage} alt='employeebackgroundImage' className='employeebackgroundImage' />
      </div>
    
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </div>
    </section>
  );
};

export default EmployeeFeaturePage;
