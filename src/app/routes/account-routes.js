const AccountRouterHelper = require('../helpers/AccountRouterHelper');
const {verifyToken} = require('../../config/token-service');

module.exports = (app) => {
    const helper = new AccountRouterHelper();

    app.get("/accounts", verifyToken, (req, res) => helper.selectFrom(req, res));

    app.get("/accounts/:id", verifyToken, (req, res) => helper.selectOne(req, res));

    app.post("/accounts", verifyToken, (req, res) => helper.create(req, res));

    app.put("/accounts/:id", verifyToken, (req, res) => helper.update(req, res));

    app.delete("/accounts/:id", verifyToken, (req, res) => helper.delete(req, res));
};