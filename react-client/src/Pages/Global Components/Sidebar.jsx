import React from "react";
import { Link } from 'react-router-dom';
import {useAuth} from '../../apiServices/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

function Sidebar() {
  const {currentUser,useFlag,logout,isLoggedIn} = useAuth();
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <li>
          <HomeIcon/>
          <Link to="/">Home</Link>
        </li>
        
        {isLoggedIn && (
          <li onClick={logout}>
            <LogoutIcon/>
            <Link to="/"> Logout</Link>
          </li>
        )}
        {isLoggedIn &&(
          <li>
            <TimeToLeaveIcon/>
            <Link to="/reservations">My Reservations</Link>
          </li>
        )}
        {
          !isLoggedIn && (
            <li>
              <LoginIcon/>
              <Link to="/login">LogIn</Link>
            </li>
          )
        }
        {/* Add more navigation links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
