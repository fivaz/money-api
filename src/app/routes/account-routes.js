const AccountProxy = require('../infra/proxies/AccountProxy');

module.exports = (app) => {

    const accountProxy = new AccountProxy();

    app.get("/accounts", (req, res) =>
        accountProxy.findFull(req, res));

    app.post("/accounts", (req, res) =>
        accountProxy.create(req, res));

    app.get("/accounts/:id", (req, res) =>
        accountProxy.findWithTransactions(req, res));

    app.delete("/accounts/:id", (req, res) =>
        accountProxy.delete(req, res));

    app.put("/accounts/:id", (req, res) =>
        accountProxy.update(req, res));

};