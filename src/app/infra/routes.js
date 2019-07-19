const sequelize = require('./database');

module.exports = (app) => {

    app.get("/accounts", (req, res) => {
        sequelize.authenticate()
            .then(() => console.log("ok"))
            .catch(erro => console.log("not ok" + erro));
    });
};