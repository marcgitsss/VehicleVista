import React from 'react';
import Vehicle from './Vehicle'; // Import the Vehicle component
import './Vehicle.css';
import Developer from './Developer'; // Import Developer using relative path
import Header from '../Navbar/EmployeeHeader';
import Footer from '../Navbar/UserFooter';
import '../Navbar/UserFooter.css';



const EmployeeAboutUs = () => {
  return (
     <div>
        <Header />
      <Vehicle /> {/* Render the Vehicle component */}
      <Developer /> {/* Render the Developer component */}
      <Footer />
    </div>
  );
};

export default EmployeeAboutUs;
