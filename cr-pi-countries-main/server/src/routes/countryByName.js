const countryByName  = require("express").Router();
const getCountryByName = require('../controllers/getCountryByName');

countryByName.get('/', async (req, res)=>{
    const {name} = req.query;
    const country = await getCountryByName(name);
    if(country.error) return res.status(400).json(country)
    return res.status(200).json(country)
    });

module.exports = countryByName;