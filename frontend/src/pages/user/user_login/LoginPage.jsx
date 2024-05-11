import React from 'react';
import login_background from "../../../assets/login_background.jpeg";
import loginWheel from "../../../assets/loginWheel.jpg";
import { Container, Grid, Typography } from '@mui/material';
import LoginCard from './LoginCard';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';

export default function LoginPage() {
  return (
    <main className='main-content' style={{ position: 'relative', minHeight: '100vh' }}>
      <div>

        <Grid container xs={12}>
          <div style={{ position: 'absolute', top: 0, width: '95%', zIndex: 1 }}>
            <Header />
          </div>
          <Grid item xs={7} style={{
            backgroundImage: `url(${login_background})`,
            filter: 'blur(.1rem)',
            backgroundSize: '100% 100%',
            minHeight: '100vh',
          }}></Grid>
          <Grid item xs={5} style={{
            backgroundImage: `url(${loginWheel})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem', // Add margin at the bottom of the login card
          }}>
            <LoginCard />
          </Grid>
        </Grid>

      </div>
      <div style={{ position: 'absolute', bottom: 0, width: '100%', marginTop: 'auto' }}>
        <Footer />
      </div>
    </main>
  )
}
