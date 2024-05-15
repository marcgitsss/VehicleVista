import React from 'react';
import './Header.css';
import logo from '../assets/VVLogo.png'; // Importing the logo image
import { Typography } from '@mui/material';
// import { Link }  from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="Logo" className='logo'/> {/* Using the logo variable */}
      <ul> {/* Wrap Links in an unordered list */}
        <li >
          {/* <Link to="/Homepage"> Home </Link> */}
          <Typography>Home </Typography>
          
        </li>
        <li>
          {/* <Link to="/AboutUs"> About Us </Link> */}
          <Typography>About Us </Typography>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;










