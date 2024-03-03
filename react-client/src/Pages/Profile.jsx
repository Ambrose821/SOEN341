import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import  { useAuth } from '../apiServices/AuthContext';

const Profile = () => {
    const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag} = useAuth()

    // user not logged in: redirect to login page
    // if (!isLoggedIn) {
    //     return <Redirect to="/login" />;
    // } 

    return (

      <div>
      <h2>User Profile</h2>
      <div>
          {/* profile picture */}
      </div>
      <div>
          {/* Check if currentUserFlag, currentUserFirstName, and currentUserLastName are available before rendering */}
          {currentUserFlag && <p>Flag: {currentUserFlag}</p>}
          {currentUserFirstName && <p>First Name: {currentUserFirstName}</p>}
          {currentUserLastName && <p>Last Name: {currentUserLastName}</p>}
          <p>Email: {currentUser}</p>
          {/* # of reservations made */}
      </div>
  </div>
    );
  };
  
  export default Profile;