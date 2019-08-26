const Sequelize = require('sequelize');

const {
    DB_NAME = 'money',
    DB_USER = 'root',
    DB_PASSWORD = 'root',
    DB_HOST = 'localhost',
    DB_PORT = 3307
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
});

sequelize.authenticate()
    .then(() => console.log("connection successful"))
    .catch(erro => console.log("connection failed Error - " + erro));

module.exports = sequelize;