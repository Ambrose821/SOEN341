import React from "react";
import { Link } from 'react-router-dom';
import {useAuth} from '../../apiServices/AuthContext'


function Sidebar() {
  const {currentUser,useFlag,logout,isLoggedIn} = useAuth();
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        
        {isLoggedIn && (
          <li onClick={logout}><Link to="/"> Logout</Link></li>
        )}
        {
          !isLoggedIn && (
            <li><Link to="/login">LogIn</Link></li>
          )
        }
        {/* Add more navigation links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
