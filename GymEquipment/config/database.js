const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env]; // Make sure to correctly access environment config

//--------------- Database Connection -------------------- //
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: console.log,  // Log all SQL queries

});

module.exports = sequelize;