import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating a context for auth information
const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Component to provide auth context to children
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFlag, setUserFlag] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to decode JWT and set user information
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(payload.UserInfo.email);
      setUserFlag(payload.UserInfo.user_flag);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login
  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    setCurrentUser(payload.UserInfo.email);
    setUserFlag(payload.UserInfo.user_flag);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('accessToken');
    setCurrentUser(null);
    setUserFlag(null);
    setIsLoggedIn(false);
    // Assuming your logout endpoint doesn't need a body or specific headers for this example
    fetch('http://localhost:9000/users/logout', { method: 'DELETE', });
  };

  // Providing the context with current state and functions
  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, currentUserFlag, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
