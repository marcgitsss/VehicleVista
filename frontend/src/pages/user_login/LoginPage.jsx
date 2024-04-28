import React from 'react'
// import '../../pages/user_login/LoginBgm.css';
import login_background from "../../assets/login_background.jpeg"
import LoginCard from "../../pages/user_login/LoginCard"
export default function LoginPage() {
  return (
    <main className='main-content'>
      <div className="image-container">
        <img src={login_background} alt="background2" className="bkg2" />
        <LoginCard/>
      </div>

    </main>
  )
}

