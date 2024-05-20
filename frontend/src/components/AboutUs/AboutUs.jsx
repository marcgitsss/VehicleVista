import React from 'react';
import Vehicle from './Vehicle'; // Import the Vehicle component
import './Vehicle.css';
import Developer from './Developer'; // Import Developer using relative path
import Header from '../Navbar/UserHeader';
import Footer from '../Navbar/UserFooter';
import '../Navbar/UserFooter.css';



const AboutUs = () => {
  return (
     <div>
        <Header />
      <Vehicle /> {/* Render the Vehicle component */}
      <Developer /> {/* Render the Developer component */}
      <Footer />
    </div>
  );
};

export default AboutUs;
