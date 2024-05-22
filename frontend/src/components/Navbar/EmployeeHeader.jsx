import React, { useState, useEffect } from 'react';
import './EmployeeHeader.css';
import VVLogo from '../../assets/VVLogo.png';
import DropdownMenu from './menu';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 660);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for mobile viewport width
    handleResize();

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Create a link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap';

    // Append the link element to the document head
    document.head.appendChild(link);

    // Clean up function to remove the link when the component is unmounted
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className={`header ${isMobile ? 'mobile' : ''}`}>
      <div className="logo-container">
        <img src={VVLogo} alt="HeaderLogo" className="headerImage" style={{width: '12.5rem'}}/>
      </div>
      <nav className="nav">
        {isMobile ? (
          <DropdownMenu />
        ) : (
          <>
            {/* <a href="/employee-homepage">Home</a> */}
            <a href="/user_aboutus">About Us</a>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
