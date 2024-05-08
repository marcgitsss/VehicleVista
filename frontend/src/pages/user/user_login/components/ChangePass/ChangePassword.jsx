import React from 'react'
// import '../../pages/user_login/LoginBgm.css';
import login_background from "../../../../../assets/login_background.jpeg"
import loginWheel from "../../../../../assets/loginWheel.jpg"
import { Container, Grid, Typography } from '@mui/material'
import PassCard from './PassCard'
import ForgetPasswordCard from '../ForgotPass/ForgetPasswordCard'
import Header from '../../../../../components/Navbar/UserHeader'
import Footer from '../../../../../components/Navbar/UserFooter'

export default function ChangePassword() {
  return (
    <main className='main-content'>
      <div >

        {/* <Container maxWidth="lg"  > */}
        {/* <img src={login_background} alt="background2" className="bkg2" /> */}
        <Grid container xs={12} >
        <div style={{ position: 'absolute', top: 0, width: '95%', zIndex: 1 }}>
            {/* <AdminHeader /> */}
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
            <PassCard />
          </Grid>
          <div style={{ position: 'absolute', bottom: 0, width: '100%',mt:'20rem' }}>
            <Footer />
          </div>
        </Grid>

        {/* </Container> */}

      </div>
    </main>
  )
}

