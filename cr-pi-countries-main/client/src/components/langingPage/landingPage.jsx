import React from 'react';
import {Link} from 'react-router-dom'
const LandingPage = () => {

  return (
    <div className="landing-page-container">
      <h1>Welcome</h1>
      <h2>to my proyect</h2>
      <Link to="/home">
        <button>Start</button>
      </Link>
    </div>
  );
};

export default LandingPage;
