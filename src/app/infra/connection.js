const Sequelize = require('sequelize');

const {
    dbName = 'money',
    dbUser = 'root',
    dbPassword = 'root',
    dbPort = 3307,
    dbHostname = 'localhost'
} = process.env;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHostname,
    dialect: 'mysql',
    port: dbPort,
});

sequelize.authenticate()
    .then(() => console.log("connection successful"))
    .catch(erro => console.log("connection failed Error - " + erro));

module.exports = sequelize;