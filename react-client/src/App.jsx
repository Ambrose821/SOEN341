import React from "react";
import "./App.css";
import Header from "./Pages/Global Components/Header";
import Footer from "./Pages/Global Components/Footer";
import Sidebar from "./Pages/Global Components/Sidebar";
import Content from "./Pages/Global Components/Content";

function App() {

  return (
    <div className="App">
      <Sidebar />
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;