const AccountProxy = require('../infra/proxies/AccountProxy');

module.exports = (app) => {

    const accountProxy = new AccountProxy();

    app.get("/accounts", (req, res) =>
        accountProxy.findAll(req, res));

    app.post("/accounts", (req, res) =>
        accountProxy.create(req, res));

    app.get("/accounts/:id", (req, res) =>
        accountProxy.find(req, res));

    app.delete("/accounts/:id", (req, res) =>
        accountProxy.delete(req, res));

    app.put("/accounts/:id", (req, res) =>
        accountProxy.update(req, res));

};