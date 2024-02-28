import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
          <Header className="header" />
          <div className="body">  
            <Sidebar className="sidebar" />
            <div className="content">
                <main>{children}</main>
            </div>
          </div>
          <Footer className="footer" />
        </div>
      );
};

export default Layout;