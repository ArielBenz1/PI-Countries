const { Country} = require('../db.js');

const getAllCountries = async () => {
    try {
      const countries = await Country.findAll();
      return countries;
    } catch (error) {
      return { error: 'Error al obtener los países' };
    }
  };

module.exports = getAllCountries;
