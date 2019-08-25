const AccountRouterHelper = require('../helpers/AccountRouterHelper');

module.exports = (app) => {
    const helper = new AccountRouterHelper();

    //TODO use route below
    app.get("/accounts/:userId", (req, res) => helper.selectFrom(req, res));

    //TODO use the second version of routes
    app.get("/account/:id", (req, res) => helper.selectOne(req, res));

    app.post("/accounts", (req, res) => helper.create(req, res));

    app.put("/accounts/:id", (req, res) => helper.update(req, res));

    app.delete("/accounts/:id", (req, res) => helper.delete(req, res));
};