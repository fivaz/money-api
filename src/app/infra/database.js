const Sequelize = require('sequelize');
const sequelize = new Sequelize('money', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log("ok"))
    .catch(erro => console.log("not ok" + erro));
