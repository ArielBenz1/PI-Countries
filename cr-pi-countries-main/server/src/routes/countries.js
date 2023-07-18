const countries  = require("express").Router();
const getAllCountries = require('../controllers/getAllCountries');

countries.get('/', async (req, res)=>{
    const allCountries = await getAllCountries();
    return res.status(200).json(allCountries);
    });

module.exports = countries;
