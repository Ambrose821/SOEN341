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
            <Link to="/reservations" className={`sidebarLink ${location.pathname === '/reservations' ? 'activeLink' : ''}`}> {/* Add activeLink class if current path is '/reservations' */}
              <EventIcon className="icon" />
              <span className="sidebarTitle">My Reservations</span>
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
        
          <li>
            <Link to="/cars" className={`sidebarLink ${location.pathname === '/' ? 'activeLink' : ''}`}> 
              <DriveEtaIcon className="icon" />
              <span className="sidebarTitle">Cars</span>
            </Link>
          </li>
      

        {/* link to favourite cars page */}
        
          <li>
            <Link to="/favorites" className={`sidebarLink ${location.pathname === '/' ? 'activeLink' : ''}`}>
              <FavoriteIcon className="icon" />
              <span className="sidebarTitle">Favorites</span>
            </Link>
          </li>
       


        {/* Add more navigation links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
