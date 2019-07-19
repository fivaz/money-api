module.exports = (app) => {

    app.get("/accounts", (req, res) => {
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize('money', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3307
        });

        sequelize.authenticate()
            .then(() => console.log("ok"))
            .catch(erro => console.log("not ok" + erro));

    });
};