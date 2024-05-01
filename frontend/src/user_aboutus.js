import React from 'react';
import Header from './components/Navbar/UserHeader';
import './components/Navbar/UserHeader.css'; 
import Footer from './components/Navbar/UserFooter';
import './components/Navbar/UserFooter.css';
import backgroundImage from './assets/SIABackground.png';
import './user_aboutus.css';

const AboutUs = () => {
  return (
    <div className='aboutUs'>
      <Header />
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImageAU' />
      <Footer />
    </div>
  );
};

export default AboutUs;
