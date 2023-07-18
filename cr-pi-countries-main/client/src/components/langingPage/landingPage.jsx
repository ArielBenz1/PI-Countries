import React from 'react';
import {Link} from 'react-router-dom'
import './landingPage.css'
const LandingPage = () => {

  return (
    <div className="landing-page-container">
      <h1>Bienvenidos</h1>
      <h2>a mi Proyecto</h2>
      <Link to="/home">
        <button>Start</button>
      </Link>
    </div>
  );
};

export default LandingPage;
