const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Inventory = db.define('Inventory', {
  swapi_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
  }
});

module.exports = Inventory