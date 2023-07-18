const fs = require('fs');
const path = require('path');
const { Country } = require('./src/db');

module.exports = async () => {
  try {
    const filePath = path.join(__dirname, 'api', 'db.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const countries = JSON.parse(data).countries;

    countries.forEach(country => {
      const newCountry = {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags.png,
        continent: country.continents[0],
        capital: Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : '',
        population: country.population,
      };
      Country.create(newCountry);
    });

    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};