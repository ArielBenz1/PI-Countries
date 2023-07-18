const { Country } = require('../db.js');
const { Op } = require('sequelize');

const getCountryByName = async (name) => {
    try {
        const country = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`
            }
          }
        });
      if (!country) {
        return { error: `No hay países con el nombre ${name}` };
      }
      return country;
    } catch (error) {
      return { error: 'Error al obtener el país' };
    }
  };

  module.exports = getCountryByName;