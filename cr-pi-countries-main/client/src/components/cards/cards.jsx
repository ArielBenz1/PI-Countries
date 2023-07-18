import React from 'react';
import Card from '../card/card';
import './cards.css';

const Cards = ({ countries }) => {
  return (
    <div className="cards-container">
      {countries.map((country) => (
        <div key={country.id} className="card">
          <Card country={country} />
        </div>
      ))}
    </div>
  );
};

export default Cards;

