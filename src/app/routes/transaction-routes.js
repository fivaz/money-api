const TransactionProxy = require('../infra/proxies/TransactionProxy');

module.exports = (app) => {

    const transactionProxy = new TransactionProxy();

    app.get("/transactions", (req, res) =>
        transactionProxy.findAll(req, res));

    app.post("/transactions", (req, res) =>
        transactionProxy.create(req, res));

    app.get("/transactions/:id", (req, res) =>
        transactionProxy.find(req, res));

    app.delete("/transactions/:id", (req, res) =>
        transactionProxy.delete(req, res));

    app.put("/transactions/:id", (req, res) =>
        transactionProxy.update(req, res));

};