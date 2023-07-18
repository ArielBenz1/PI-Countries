const { Activity } = require('../db.js');

const getAllActivities = async () => {
    try {
      const activities = await Activity.findAll();
      return activities;
    } catch (error) {
      return { error: 'Error al obtener las actividades' };
    }
  };

  module.exports = getAllActivities;