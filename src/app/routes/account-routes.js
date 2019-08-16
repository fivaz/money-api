const AccountProxy = require('../infra/proxies/AccountProxy');
const AccountRouterHelper = require('../helpers/AccountRouterHelper');

module.exports = (app) => {

    const account = new AccountProxy();
    const helper = new AccountRouterHelper();

    app.get("/accounts", (req, res) => helper.select(req, res));

    app.post("/accounts", (req, res) => helper.create(req, res));

    app.get("/accounts/:id", (req, res) => helper.selectOne(req, res));

    app.delete("/accounts/:id", (req, res) =>
        account.delete(req, res));

    app.put("/accounts/:id", (req, res) =>
        account.update(req, res));

};