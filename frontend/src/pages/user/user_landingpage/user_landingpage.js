import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import Footer from '../../../components/Footer';
import LandingBG from '../../../assets/LandPageBG.png';
import TransitionsModal from './landingModal';
import './user_landingpage.css';
import Footer from '../../../components/Navbar/UserFooter';
import Header from '../../../components/Navbar/UserHeader';
import { Button } from '@mui/material';

const LandingPage = () => {
  return (
    <div>
      <div className='header'>
        <Header />
      </div>
      
      <div className="landingPage">
        <div className="landingPageIntroduction">
          <div className="landingPageText">
            <h2>Registration<br/>made easy</h2>
            <h3>Get your campus vehicle sticker hassle-free.<br /> Easily register or renew with us.</h3>
            {/* Use Link instead of button for navigation */}
            {/* <Link to="/login" className="loginButton"><Button>Login</Button></Link> */}
            <Link to="/login" ><Button  sx={{width: '5rem', height: '3rem', fontSize: '1.5rem', backgroundColor: '#F4C522', color: 'black', textTransform: 'none', ":hover": { backgroundColor: '#8A252C' } }}>Login</Button></Link>
          </div>
          <div className="modalContainer">
            <TransitionsModal />
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
