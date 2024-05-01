import React from 'react';
import Header from './components/Navbar/UserHeader';
import Footer from './components/Navbar/UserFooter';
import LandingBG from './assets/LandPageBG.jpg';
import './components/Navbar/UserFooter.css';
import './user_landingpage.css';

const LandingPage = () => {
  const handleLoginClick = () => {
    // Placeholder function for handling login button click
    console.log("Login button clicked");
  };

  return (
    <div>
      <div className='header'>
        <Header />
      </div>
      
      <img src={LandingBG} alt="LandingBG" className='LandingBG' />
      <div className="landingPage">
        <div className="landingPageIntroduction">
          <div className="landingPageText">
            <h2>Registration<br/>made easy</h2>
            <h3>Get your campus vehicle sticker hassle-free.<br /> Easily register or renew with us.</h3>
            <button className="loginButton" onClick={handleLoginClick}>Login</button>
          </div>
          
        </div>
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
