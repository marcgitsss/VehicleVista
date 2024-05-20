function Footer() {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={footerlogo} alt="footerlogo" className='footerlogo' />
      </div>
      <div className='footer-content'>
        <div className='info1'>
          <div>
            <h6 className='this'>Contact Us</h6>
            <p>N. Bacalso Avenue, Cebu City <br /> Philippines 6000</p>
            <p>+63 32 411 2000 (trunkline)</p>
            <p>info@cit.edu</p>
          </div>
          <div className='info2'>
            <h6 className='title'>Quick Links</h6>
            <nav className="nav-footer">
              <a href="#home">Cit.edu</a>
              <a href="#about">Lair</a>
              <a href="#about">AIMS</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
