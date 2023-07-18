import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCountryById } from '../../redux/actions';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    dispatch(getCountryById(id))
      .then((data) => {
        setCountryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country details:', error);
        setLoading(false);
      });
  }, [dispatch, id]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!countryData) {
    return <div>No se encontró información para el país con ID {id}.</div>;
  }
  return (
    <div>
      <img src={countryData.flag} alt={countryData.name} />
      <h2>Name: {countryData.name}</h2>
      <h2>ID: {countryData.id}</h2>
      <p>Continent: {countryData.continent}</p>
      <p>Capital: {countryData.capital}</p>
      <h3>Population: {countryData.population}</h3>
      {countryData.Activities && countryData.Activities.length > 0 && (
        <>
          <h3>Activities:</h3>
          <ul>
            {countryData.Activities.map((activity) => (
              <li key={activity.id}>
                <strong>Name:</strong> {activity.name}<br />
                <strong>Difficulty:</strong> {activity.difficulty}<br />
                <strong>Season:</strong> {activity.season}
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/home">
        <button>Volver a Home</button>
      </Link>
    </div>
  );
};

export default Detail;
