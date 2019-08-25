const TransactionRouterHelper = require('../helpers/TransactionRouterHelper');
const {verifyToken} = require('../../config/token-service');

module.exports = (app) => {
    const helper = new TransactionRouterHelper();

    app.get("/transactions", verifyToken, (req, res) => helper.select(req, res));

    app.get("/transactions/:accountId", verifyToken, (req, res) => helper.selectFrom(req, res));

    app.post("/transactions", verifyToken, (req, res) => helper.create(req, res));

    app.put("/transactions/:id", verifyToken, (req, res) => helper.update(req, res));

    app.delete("/transactions/:id", verifyToken, (req, res) => helper.delete(req, res));
};
