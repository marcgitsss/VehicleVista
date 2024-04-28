import React from 'react';
//import '../Components/ChangePassword/ChangePassBgm.css'
import ChangePasswordCard from '../Components/ChangePassword/ChangePasswordCard';

export default function ChangePassPage() {
  return (
    <main className='main-content'>
      <div className="image-container">
        <img src="../background.jpeg" alt="background2" className="bkg2" />
        <ChangePasswordCard/>
      </div>
    </main>
  );
}
