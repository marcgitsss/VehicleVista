import React from 'react';
import backgroundImageAU from '../../assets/AUBackground.png'; // Correct the path and import syntax
import './Vehicle.css';

const Vehicle = () => {
  return (
    <section className="vehicle-section">
      <div className="background">
        <img src={backgroundImageAU} alt='backgroundImageAU' className='backgroundImageAU' />
      </div>
      
      <div className="text">
        <div className="heading">Vehicle Vista</div>
        <p className="description">
          The Smart Vehicle Registration System aims to enhance security and streamline<br />
          vehicle management for educational institutions, residential communities, governmental<br />
          agencies, and other organizations. Leveraging modern technology, the system will<br />
          automate vehicle registration and tracking processes, providing a comprehensive<br />
          solution for efficient management.
        </p>
      </div>
    </section>
  );
};

export default Vehicle;
