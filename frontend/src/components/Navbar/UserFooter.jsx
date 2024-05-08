import React, { useEffect } from 'react';
import './UserFooter.css'; // Import your CSS file for styling
import LogoFooter from '../../assets/LogoFooter.png';



const Footer = () => {
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
        <div className="footer">
          <div className="logoContainer">
            <img src={LogoFooter} alt="FooterLogo"className='footerLogo' style={{width: '9.5rem'}}/>
          </div>
    
          <div className='info1'>
            <div>
                <h6 className='this'>Contact Us</h6>
                    <p>N. Bacalso Avenue, Cebu City <br/> Philippines 6000</p>
                    <p>+63 32 411 2000 (trunkline)</p> 
                    <p>info@cit.edu</p>
            </div>
            <div className='info2'>
                <h6 className='title'>Quick Links</h6>
                    <nav className="nav-footer">
                    <a href="https://cit.edu">Cit.edu</a>
                    <a href="https://lair.education">Lair</a>
                    <a href="https://cituweb.pinnacle.com.ph/aims/students/">AIMS</a>
                    </nav>
            </div>
    
            </div>
        </div>
      );
    }
    
    export default Footer;