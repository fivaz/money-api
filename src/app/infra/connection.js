const Sequelize = require('sequelize');
const dbName = process.env.DB_NAME || 'money';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbPort = process.env.DB_PORT || 3307;
const dbHostname = process.env.DB_HOST || 'localhost';
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHostname,
    dialect: 'mysql',
    port: dbPort,
});

sequelize.authenticate()
    .then(() => console.log("connection successful"))
    .catch(erro => console.log("connection failed Error - " + erro));

module.exports = sequelize;