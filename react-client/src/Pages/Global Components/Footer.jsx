import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to="/about">About</Link></td>
              <td><Link to="/contact">Help/ FAQ</Link></td>
            </tr>
            <tr>
              <td><Link to="/careers">Careers</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Footer;
