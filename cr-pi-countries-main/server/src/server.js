const express = require("express");
const router = require("./routes/countries");
const activities = require("./routes/activities");
const countryById = require("./routes/countryById");
const countryByName = require("./routes/countryByName");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use('/countries', router);
server.use('/countries/name', countryByName);
server.use('/countries/:id', countryById);
server.use('/activities', activities);


module.exports = server;
