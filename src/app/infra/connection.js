const Sequelize = require('sequelize');
const sequelize = new Sequelize('money', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

sequelize.authenticate()
    .then(() => console.log("connection successful"))
    .catch(erro => console.log("connection failed Error - " + erro));

module.exports = sequelize;