const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [3, 3], 
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};