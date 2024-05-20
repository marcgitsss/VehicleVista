import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import PayMod from './pages/vehicle_registration/payMod';
import ChooseUserTypeModal from './pages/vehicle_registration/ChooseUserTypeModal/ChooseUserTypeModal';
import UserHomepage from './pages/user/user_homepage/user_homepage';
import { AuthProvider } from './context/AuthProvider';


ReactDOM.render(
  <React.StrictMode>
<BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
