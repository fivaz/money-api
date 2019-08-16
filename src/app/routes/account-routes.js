const AccountRouterHelper = require('../helpers/AccountRouterHelper');

module.exports = (app) => {
    const helper = new AccountRouterHelper();

    app.get("/accounts", (req, res) => helper.select(req, res));

    app.get("/accounts/:id", (req, res) => helper.selectOne(req, res));

    app.post("/accounts", (req, res) => helper.create(req, res));

    app.put("/accounts/:id", (req, res) => helper.update(req, res));

    app.delete("/accounts/:id", (req, res) => helper.delete(req, res));
};