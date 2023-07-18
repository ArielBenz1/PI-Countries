import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivities, getAllCountries } from '../../redux/actions';
import { Link } from 'react-router-dom';


const ActivityForm = () => {
  const [activityData, setActivityData] = useState({
    name: '',
    difficulty: '',
    season: '',
    countryId: [],
  });

  const [searchText, setSearchText] = useState('');
  const [showFilteredCountries, setShowFilteredCountries] = useState(false); // Nuevo estado para controlar la visualización de los países filtrados
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleCountrySelect = (selectedCountry) => {
    const isSelected = activityData.countryId.includes(selectedCountry);
    let updatedCountryId = [];
    if (isSelected) {
      updatedCountryId = activityData.countryId.filter((country) => country !== selectedCountry);
    } else {
      updatedCountryId = [...activityData.countryId, selectedCountry];
    }
    setActivityData({ ...activityData, countryId: updatedCountryId });
  };

  const handleRemoveCountry = (removedCountry) => {
    const updatedCountryId = activityData.countryId.filter((country) => country !== removedCountry);
    setActivityData({ ...activityData, countryId: updatedCountryId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data to be sent:', activityData);
    dispatch(createActivities(activityData));
  };

  // Filtrar países según el texto de búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={activityData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Dificultad:</label>
        <input
          type="number"
          name="difficulty"
          value={activityData.difficulty}
          onChange={handleInputChange}
          min="1"
          max="5"
        />
      </div>
      <div>
        <label>Temporada:</label>
        <select name="season" value={activityData.season} onChange={handleInputChange}>
          <option value="">Seleccione una temporada</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
      </div>
      <div>
        <label>Pais/es:</label>
        <input
          type="text"
          placeholder="Search country..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowFilteredCountries(true); // Mostrar solo países filtrados al cambiar el texto de búsqueda
          }}
        />
        {showFilteredCountries ? ( // Mostrar solo si se activa el estado showFilteredCountries
          <ul>
            {filteredCountries.map((country) => {
              const isSelected = activityData.countryId.includes(country.id);
              return (
                <li key={country.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCountrySelect(country.id)}
                    />
                    {country.name} - {country.id}
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div>
        <label>Pais/es selecionados:</label>
        <ul>
          {activityData.countryId.map((countryId) => {
            const country = countries.find((country) => country.id === countryId);
            return (
              <li key={countryId}>
                {country.name} - {country.id}
                <button type="button" onClick={() => handleRemoveCountry(countryId)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Link to="/home">
      <button>Volver a Home</button>
      </Link>
      <button type="submit">Create Activity</button>
    </form>
  );
};

export default ActivityForm;
