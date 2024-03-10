import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating a context for auth information
const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);


// Component to provide auth context to children
export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
    const [currentUserFirstName, setCurrentUserFirstName] = useState(null);
    const [currentUserLastName, setCurrentUserLastName] = useState(null);
    const [currentUserFlag, setUserFlag] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  /*const userAccessToken = localStorage.getItem('accessToken')
  if (userAccessToken && isLoggedIn) {
    const payload = JSON.parse(atob(userAccessToken.split('.')[1]));
    setCurrentUser(payload.UserInfo.user.email);
      setCurrentUserFirstName(payload.UserInfo.user.firstName);
      setCurrentUserLastName(payload.UserInfo.user.lastName);
      setUserFlag(payload.UserInfo.user.user_flag);
    setIsLoggedIn(true);
    
  
  }*/
  
  // Effect to decode JWT and set user information
  useEffect(() => {
  
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      //console.log(currentUserFirstName, currentUserLastName, currentUserFlag);
      setCurrentUser(payload.UserInfo.user.email);
      setCurrentUserFirstName(payload.UserInfo.user.firstName);
      setCurrentUserLastName(payload.UserInfo.user.lastName);
      setUserFlag(payload.UserInfo.user.user_flag);
      setIsLoggedIn(true);
      
   
    
     console.log(currentUserFirstName, currentUserLastName, currentUserFlag, isLoggedIn);
    }
  }, [currentUserFlag,isLoggedIn,currentUser,currentUserLastName,currentUserFirstName]);

  // Function to handle login
  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    setCurrentUser(payload.UserInfo.user.email);
    setUserFlag(payload.UserInfo.user_flag);
    setCurrentUserFirstName(payload.UserInfo.firstName);
    setCurrentUserLastName(payload.UserInfo.lastName);
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

  const updateAdmin = (flag_value, accessToken) =>{
    setUserFlag(flag_value)
    logout();
    login(accessToken)

  }
  const updateUserInfo = (accessToken) => {
    logout()
    login(accessToken)
    
  }
  const deleteUser =()=> {
    localStorage.removeItem('accessToken');
    logout();
    
  }
  // Providing the context with current state and functions
  return (

    <AuthContext.Provider value={{ isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, login, logout, updateAdmin,updateUserInfo,deleteUser }}>

      {children}
    </AuthContext.Provider>
  );
};
