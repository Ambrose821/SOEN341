import React from "react";
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../../apiServices/AuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  
  const location = useLocation(); // Get current location

  const {currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, useFlag, logout, isLoggedIn} = useAuth();


  return (
    <div className="header">
        {/* <div className="HeadTitle">
          Header
        </div> */}
        
        <div className="profile">
        {isLoggedIn && (
            <Link to="/profile" className={`sidebarLink ${location.pathname === '/profile' ? 'activeLink' : ''}`}>{/* Add activeLink class if current path is '/profile' */}
              <AccountCircleIcon className="icon" />
              <span className="sidebarTitle">My Profile</span>
            </Link>
        )}
        </div>
    </div>
    
  );
}

export default Header;
