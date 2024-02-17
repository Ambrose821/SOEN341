import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Global Components/Layout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login_page";;

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          {/* Add routes for other pages */} 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;