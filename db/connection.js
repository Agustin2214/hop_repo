// const Sequelize = require('sequelize')

// const db = new Sequelize('TimbaProject','postgres','12345678',{
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false
// });
 
// module.exports = db

const { Sequelize } = require('sequelize');

// TODO - cambiar por variable de entorno
const db = new Sequelize(process.env.URL_DB_DOCKER, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, 
});

module.exports = db;