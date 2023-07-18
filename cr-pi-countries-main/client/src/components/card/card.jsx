import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ country }) => {
  return (
    <Link to={`/detail/${country.id}`}>
      <div>
        <img src={country.flag} alt={country.name} />
        <h2>{country.name}</h2>
        <p>Continent: {country.continent}</p>
      </div>
    </Link>
  );
};

export default Card;
