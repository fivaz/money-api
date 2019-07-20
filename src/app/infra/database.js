const Sequelize = require('sequelize');
const sequelize = new Sequelize('money', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

const Model = Sequelize.Model;

sequelize.authenticate()
    .then(() => console.log("connection successful"))
    .catch(erro => console.log("connection failed Error - " + erro));

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;

module.exports = db;


