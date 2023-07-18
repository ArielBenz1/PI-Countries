const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const loadData = require('./loadData');
const PORT = 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, async() => {
  console.log(`Server listening on port ${PORT}`);
  await loadData();
})
}).catch(error => console.error(error))