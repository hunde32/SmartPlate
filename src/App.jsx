import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; 

function App() {
  return (
    <div className="center-wrapper">
      <div className="main-continer">
        <div className="logos">
          <img src="logo.png" alt="Logo" className="logo" />
          <h2 className="logo-name">Smart Plate</h2>
        </div>
        <div className="slogans">
          <h1 className="slogan1">Simpilfy Your Meals, Savor Your life</h1>
          <p className="slogan2">
            Effort less meal planning, personalized just for you
          </p>
        </div>
        <div className="btn-and-search">
          <button>Get Started</button>
          <input type="search" placeholder="Search" />
        </div>
        <div className="food-search"></div>
      </div>
    </div>
  );
}

export default App;
