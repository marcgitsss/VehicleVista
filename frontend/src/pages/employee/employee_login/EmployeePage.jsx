import React, { useState } from 'react'
// import '../../pages/user_login/LoginBgm.css';
import login_background from "../../../assets/login_background.jpeg"
import loginWheel from "../../../assets/loginWheel.jpg"
import { Container, Grid, Typography, Snackbar } from '@mui/material'
import Header from '../../../components/Navbar/UserHeader'
import Footer from '../../../components/Navbar/UserFooter'
import EmployeeCard from './EmployeeCard'

export default function EmployeePage() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  return (
    <main className='main-content'>
      <div >

        {/* <Container maxWidth="lg"  > */}
        {/* <img src={login_background} alt="background2" className="bkg2" /> */}
        <Grid container xs={12} >
        <div style={{ position: 'absolute', top: 0, width: '95%', zIndex: 1 }}>
          <Header />
          </div>
          <Grid item xs={7} style={{
            backgroundImage: `url(${login_background})`,
            filter: 'blur(.1rem)',
            backgroundSize: '100% 100%',
            minHeight: '100vh',
          }}>


          </Grid>
          <Grid item xs={5} style={{
            backgroundImage: `url(${loginWheel})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <EmployeeCard onLoginSuccess={handleLoginSuccess}/>
          </Grid>
          <div style={{ position: 'absolute', bottom: 0, width: '100%',mt:'20rem' }}>
            {/* <Footer /> */}
          </div>
        </Grid>

        {/* </Container> */}
        <div>
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
        </div>
      </div>
      
    </main>
  )
}

