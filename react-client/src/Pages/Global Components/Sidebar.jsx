import React from "react";
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../../apiServices/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';

function Sidebar() {

  const location = useLocation(); // Get current location
  
  const {currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, useFlag, logout, isLoggedIn} = useAuth();

  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <li>
          <Link to="/" className={`sidebarLink ${location.pathname === '/' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/' */}
            <HomeIcon className="icon" />
            <span className="sidebarTitle">Home</span>
          </Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to="/profile" className={`sidebarLink ${location.pathname === '/profile' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/profile' */}
              <AccountCircleIcon className="icon" />
              <span className="sidebarTitle">My Profile</span>
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/Reservations" className={`sidebarLink ${location.pathname === '/Reservations' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/reservations' */}
              <EventIcon className="icon" />
              <span className="sidebarTitle">My Reservations</span>
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/Billing" className={`sidebarLink ${location.pathname === '/Billing' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/Billing' */}
              <AttachMoneyIcon className="icon" />
              <span className="sidebarTitle">Billing Information</span>
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/" className={`sidebarLink ${location.pathname === '/' ? 'activeLink' : ''}`} onClick={logout}> {/* Add activeLink class if current path is '/' */}
              <LogoutIcon className="icon" />
              <span className="sidebarTitle">Logout</span>
            </Link>
          </li>
        )}
        
        {!isLoggedIn && (
          <li>
            <Link to="/login" className={`sidebarLink ${location.pathname === '/login' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/login' */}
              <LoginIcon className="icon" />
              <span className="sidebarTitle">LogIn</span>
            </Link>
          </li>
        )}

        {/* link to all available cars page */}
        
          
          {/* link to add car page */}
          {isLoggedIn && currentUserFlag == "admin" && (
          <li>
            <Link to="/admindashboard" className={`sidebarLink ${location.pathname === '/admindashboard' ? 'activeLink' : ''}`}> 
              <DriveEtaIcon className="icon" />
              <span className="sidebarTitle">Admin Dashboard</span>
            </Link>
          </li>
          )}

        {/* link to favourite cars page */}
        
          <li>
            <Link to="/favorites" className={`sidebarLink ${location.pathname === '/' ? 'activeLink' : ''}`}>
              <FavoriteIcon className="icon" />
              <span className="sidebarTitle">Favorites</span>
            </Link>
          </li>
       
      </ul>
    </div>
  );
}

export default Sidebar;
