const countryById  = require("express").Router();
const getCountryById = require('../controllers/getCountryById');

countryById.get('/', async (req, res)=>{
    const {id} = req.query;
    const countryId = await getCountryById(id);
    if(countryId.error) return res.status(400).json(countryId)
    return res.status(200).json(countryId)
    });

module.exports = countryById;