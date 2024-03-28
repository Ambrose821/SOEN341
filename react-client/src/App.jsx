import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Global Components/Layout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/login_page";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Careers from "./Pages/Careers";
import Reserve from "./Pages/Reserve";
import Reservations from "./Pages/Reservations";
import { AuthProvider } from "./apiServices/AuthContext";
import ProfileSettings from "./Pages/ProfileSettings";
import ViewUserReservations from './Pages/ViewUserReservations';
import AdminDashboard from "./Pages/AdminDashboard";
import Billing from "./Pages/Billing";
import InfoReservationPage from "./Pages/InfoReservePage";
import Checkin from "./Pages/Checkin";
import Agreement from "./Pages/Agreement";
import AgreementPhys from "./Pages/AgreementPhys";
import InfoCarPage from "./Pages/InfoCarPage";
import Checkout from "./Pages/Checkout";
import CarReviewsPage from "./Pages/CarReviews";
import Reviews from "./Pages/ViewReservations";



function App() {

  return (
    <Router>
      <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/agreementp" element={<AgreementPhys/>} />
          <Route path="/checkin" element={<Checkin />} />

          <Route path="/profileSettings" element={<ProfileSettings/>} />   
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/viewuserreservations" element={<ViewUserReservations/>} /> 
          <Route path="/admindashboard" element={<AdminDashboard/>} /> 
          <Route path="/Reserve" element={<Reserve />} /> 
          <Route path="/Reservations" element={<Reservations />} /> 
          <Route path="/Billing" element={<Billing />} /> 
          <Route path="/InfoReserve" element={<InfoReservationPage />} /> 
          <Route path="/InfoCar" element={<InfoCarPage />} /> 

          <Route path="/agreement" element={<Agreement />} /> 
          
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/CarReviews" element={<CarReviewsPage/>} />ReviewsPage
          <Route path="/Reviews" element={<Reviews/>} />

        </Routes>
      </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;