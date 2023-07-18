const { Country, Activity} = require('../db.js');

const getCountryById = async (id) => {
    try {
      const country = await Country.findByPk(id, { include: Activity });
      if (!country) {
        return { error: `No hay países con el id ${id}` };
      }
      return country;
    } catch (error) {
      return { error: 'Error al obtener el país' };
    }
  };

  module.exports = getCountryById;