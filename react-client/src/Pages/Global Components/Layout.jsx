import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`layout ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header className="header" isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="body">  
        <Sidebar className="sidebar" isDarkMode={isDarkMode} />
        <div className="content">
          <main>{children}</main>
        </div>
      </div>
      <Footer className="footer" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Layout;
