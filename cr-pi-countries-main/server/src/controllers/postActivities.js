const { Activity} = require('../db.js');

const postActivities = async (name, difficulty, season, countryId) => {
    const seasonUp = season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();
    const newActivity = await Activity.create({
        name: name,
        difficulty: difficulty,
        season: seasonUp
      });
      if (countryId && countryId.length > 0) {
        await newActivity.addCountries(countryId);
      }
    return newActivity;
};

module.exports = postActivities;