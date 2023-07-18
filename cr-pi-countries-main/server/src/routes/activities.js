const routes_activities  = require("express").Router();
const getAllActivities = require('../controllers/getAllActivities');
const postActivities = require('../controllers/postActivities');
const { Country } = require('../db.js');

routes_activities.get('/',async (req, res)=>{
    const allActivities = await getAllActivities();
    return res.status(200).json(allActivities);
});

routes_activities.post('/',async (req, res)=>{
    const {name,difficulty,season,countryId} = req.body;
    try {
        if (!name || !difficulty || !season || !countryId || !Array.isArray(countryId)) {
            throw new Error('No se envió toda la información necesaria');
          } else {
            const validCountries = await Country.findAll({
              where: {
                id: countryId
              }
            });
      
            if (validCountries.length !== countryId.length) {
              throw new Error('Alguno(s) de los paises proporcionados no son válidos');
            }
            const newActivity = await postActivities(name, difficulty, season, countryId);
            res.status(200).json(newActivity);
          }
    } catch (error) {
       return res.status(400).json(error.message);
    }
});

module.exports = routes_activities;