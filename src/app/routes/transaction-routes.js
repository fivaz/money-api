const TransactionRouterHelper = require('../helpers/TransactionRouterHelper');

module.exports = (app) => {
    const helper = new TransactionRouterHelper();

    app.get("/transactions", (req, res) => helper.select(req, res));

    app.get("/transactions/:accountId", (req, res) => helper.selectFrom(req, res));

    app.post("/transactions", (req, res) => helper.create(req, res));

    app.put("/transactions/:id", (req, res) => helper.update(req, res));

    app.delete("/transactions/:id", (req, res) => helper.delete(req, res));
};
