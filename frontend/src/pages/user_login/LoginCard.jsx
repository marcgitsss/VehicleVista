import React, { useState } from 'react';
import './logincard.css';

export default function LoginCard() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with loginData, like sending it to an API
    console.log(loginData);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Login</p>
          <div className="input-container">
            <input
              type="email"
              placeholder="Username"
              className="input-field"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>
          <p className="signup-link">
            No account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};
