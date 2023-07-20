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
  const [showFilteredCountries, setShowFilteredCountries] = useState(false);
  const [activityCreated, setActivityCreated] = useState(false);
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

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      activityData.name.trim() === '' ||
      activityData.difficulty.trim() === '' ||
      activityData.season.trim() === '' ||
      activityData.countryId.length === 0
    ) {
      alert('Por favor, complete todos los campos antes de enviar el formulario.');
      return; 
    }
    dispatch(createActivities(activityData));
    setActivityCreated(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={activityData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Difficulty:</label>
        <select name="difficulty" value={activityData.difficulty} onChange={handleInputChange}>
          <option value="">Select a difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label>Season:</label>
        <select name="season" value={activityData.season} onChange={handleInputChange}>
          <option value="">Select a Season</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          placeholder="Search country..."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setShowFilteredCountries(true); 
          }}
        />
        {showFilteredCountries ? ( 
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
        <label>Selected countries:</label>
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
      {activityCreated && <p>La actividad fue creada correctamente.</p>}
      <Link to="/home">
      <button>Home</button>
      </Link>
      <button type="submit">Create Activity</button>
    </form>
  );
};

export default ActivityForm;
