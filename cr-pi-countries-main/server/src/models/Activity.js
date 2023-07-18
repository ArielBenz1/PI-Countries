const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    season: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false,
    },
  });
};