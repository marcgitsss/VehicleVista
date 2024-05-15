import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () =>{
  return useContext(UserContext);

}
