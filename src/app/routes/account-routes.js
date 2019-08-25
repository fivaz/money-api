const AccountRouterHelper = require('../helpers/AccountRouterHelper');
const RouterHelper = require("../helpers/RouterHelper");

module.exports = (app) => {
    const helper = new AccountRouterHelper();

    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            next();
        } else
            RouterHelper.sendResponse(res, 499, 'token required');
    }

    app.get("/accounts/:userId", verifyToken, (req, res) => helper.selectFrom(req, res));

    //TODO use the second version of routes
    app.get("/account/:id", (req, res) => helper.selectOne(req, res));

    app.post("/accounts", (req, res) => helper.create(req, res));

    app.put("/accounts/:id", (req, res) => helper.update(req, res));

    app.delete("/accounts/:id", (req, res) => helper.delete(req, res));
};