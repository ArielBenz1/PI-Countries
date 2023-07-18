import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import './search.css'

const SearchBar = ({ setSearchResult }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const countries = useSelector((state) => state.countries);

  const handleSearch = async () => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(filteredCountries);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input type="text" value={searchQuery} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

