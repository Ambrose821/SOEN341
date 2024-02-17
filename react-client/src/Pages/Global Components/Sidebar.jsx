import React from "react";
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
