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

// sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//     .then(() => sequelize.sync({force: true}))
//     .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
//     .then(() => console.log('Database synchronised.'))
//     .catch(err => console.log(err));

module.exports = {Model, Sequelize, sequelize};

/*
Accounts.create({name: "Bank"});
Categories.create({name: "Supermarket"});
Transactions.create({
    description: "Test1",
    value: 20.05,
    date: new Date(),
    type: "Spending",
    sourceAccount: 1,
    destinationAccount: null
});
*/
