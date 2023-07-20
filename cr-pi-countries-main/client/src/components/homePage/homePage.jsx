import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, getCountriesByName, getActivities, getCountryById } from '../../redux/actions';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';
import SearchBar from '../searchBar/searchBar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [nameSortOrder, setNameSortOrder] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [populationSortOrder, setPopulationSortOrder] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if (searchResult.length === 0) {
      setCurrentPage(1);
    }
  }, [searchResult]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleContinentFilterChange = (continent) => {
    setContinentFilter(continent);
  };

  const handleNameSortOrderChange = (event) => {
    setNameSortOrder(event.target.value);
    setPopulationSortOrder('');
  };

  const handlePopulationSortOrderChange = (event) => {
    setPopulationSortOrder(event.target.value);
    setNameSortOrder('');
  };

  const handleActivityFilterChange = (activity) => {
    setActivityFilter(activity);
  };

  const uniqueActivities = [...new Set(allActivities.map((activity) => activity.name))];

  const sortCountriesByName = (countries, order) => {
    if (order === 'asc') {
      return countries.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'desc') {
      return countries.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else {
      return countries;
    }
  };

  const sortCountriesByPopulation = (countries, order) => {
    if (order === 'asc') {
      return countries.slice().sort((a, b) => a.population - b.population);
    } else if (order === 'desc') {
      return countries.slice().sort((a, b) => b.population - a.population);
    } else {
      return countries;
    }
  };

  useEffect(() => {
    if (activityFilter) {
      searchCountriesByActivity(activityFilter)
        .then((result) => {
          setSearchResult(result);
        })
        .catch((error) => console.log(error));
    } else {
      setSearchResult([]);
    }
  }, [activityFilter]); 
  
  const searchCountriesByActivity = async (activityName) => {
    const promises = allCountries.map((country) => dispatch(getCountryById(country.id)));
    const countryDetailsArray = await Promise.all(promises);
  
    const countriesWithActivity = countryDetailsArray.filter(
      (countryDetails) =>
        countryDetails &&
        countryDetails.Activities &&
        countryDetails.Activities.some((activity) => activity.name === activityName)
    );
  
    return countriesWithActivity;
  };

  const countriesToRender = searchResult.length === 0 ? allCountries : searchResult;

  const filteredCountries = continentFilter
    ? countriesToRender.filter((country) => country.continent === continentFilter)
    : countriesToRender;

  let sortedCountries = filteredCountries;

  if (nameSortOrder) {
    sortedCountries = sortCountriesByName(filteredCountries, nameSortOrder);
  } else if (populationSortOrder) {
    sortedCountries = sortCountriesByPopulation(filteredCountries, populationSortOrder);
  }

  const countriesWithActivity = activityFilter
  ? sortedCountries.filter((country) =>
      country.Activities && country.Activities.some((activity) => activity.name === activityFilter)
    )
  : sortedCountries;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countriesWithActivity.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <SearchBar setSearchResult={setSearchResult} />
      <select value={continentFilter} onChange={(event) => handleContinentFilterChange(event.target.value)}>
        <option value="">All countries</option>
        <option value="Africa">África</option>
        <option value="South America">South America</option>
        <option value="North America">North America</option>
        <option value="Asia">Asia</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>
      <select value={activityFilter} onChange={(event) => handleActivityFilterChange(event.target.value)}>
        <option value="">All activities</option>
        {uniqueActivities.map((activity) => (
          <option key={activity} value={activity}>
            {activity}
          </option>
        ))}
      </select>
      <select value={populationSortOrder} onChange={handlePopulationSortOrderChange}>
        <option value="">N/S</option>
        <option value="asc">Lower to Higher population</option>
        <option value="desc">Highest to Lowest population</option>
      </select>
      <select value={nameSortOrder} onChange={handleNameSortOrderChange}>
        <option value="">N/S</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <Link to="/activities">
        <button>Create Activities</button>
      </Link>
      <Cards countries={currentItems} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={countriesWithActivity.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
