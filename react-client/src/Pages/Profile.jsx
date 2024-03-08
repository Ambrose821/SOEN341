import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import  { useAuth } from '../apiServices/AuthContext';

const Profile = () => {
    const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin} = useAuth()
    const [update, setUpdate] = useState("");
    
    const [profileCurrentUser, setProfileCurrentUser] = useState(currentUser);
    const [profileCurrentUserFirstName, setProfileCurrentUserFirstName] = useState(currentUserFirstName);
    const [profileCurrentUserLastName, setProfileCurrentUserLastName] = useState(currentUserLastName);
    const [profileCurrentUserFlag, setProfileUserFlag] = useState(currentUserFlag);
  
    const [profileIsLoggedIn, setProfileIsLoggedIn] = useState(isLoggedIn);
    const [settingsClick,setSettingsClick] = useState(false)
  

    
    // user not logged in: redirect to login page
    // if (!isLoggedIn) {
    //     return <Redirect to="/login" />;
    // } 
    
    async function becomeAdmin() {
      try {
        const response = await fetch('http://localhost:9000/users/adminRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentUser: currentUser, currentUserFlag: currentUserFlag }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.log(data)
          throw new Error('Admin Request Failed');
        }

        console.log(data.message);
        console.log(data.success);
        await updateAdmin("admin", data.accessToken);
        setUpdate(data.message)
        setProfileUserFlag("admin")

      } catch (error) {
        console.error('Error:', error);

      }
  }
  async function handleSettings() {
     setSettingsClick(true)
  }

  if (settingsClick) {
    return <Navigate to='/profileSettings' replace={true} />
  }
    return (

      <div>
      <h2>User Profile</h2>
      <div>
          {/* profile picture */}
      </div>
      <div>

        
          {profileCurrentUserFlag && <p>Flag: {profileCurrentUserFlag}</p>}
          {profileCurrentUserFirstName && <p>First Name: {profileCurrentUserFirstName}</p>}
          {profileCurrentUserLastName && <p>Last Name: {profileCurrentUserLastName}</p>}
          <p>Email: {profileCurrentUser}</p>
         {/* # of reservations made */}
      </div>
      <div>
          <button onClick={becomeAdmin}>Become Admin</button>
          <button onClick ={handleSettings}>User Settings</button>
        <p>{update}</p>
      </div>
  </div>
    );
  };
  
  export default Profile;