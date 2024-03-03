import React, { useState } from 'react';
import  { useAuth } from '../apiServices/AuthContext';

const Profile = () => {
    const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin} = useAuth()
    const [update, setUpdate] = useState("");
    

    
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

      } catch (error) {
        console.error('Error:', error);

      }
    }

  
    return (

      <div>
      <h2>User Profile</h2>
      <div>
          {/* profile picture */}
      </div>
      <div>
          {currentUserFlag && <p>Flag: {currentUserFlag}</p>}
          {currentUserFirstName && <p>First Name: {currentUserFirstName}</p>}
          {currentUserLastName && <p>Last Name: {currentUserLastName}</p>}
          <p>Email: {currentUser}</p>
          {/* # of reservations made */}
      </div>
      <div>
        <button onClick={becomeAdmin}>Become Admin</button>
        <p>{update}</p>
      </div>
  </div>
    );
  };
  
  export default Profile;