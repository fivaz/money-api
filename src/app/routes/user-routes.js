const UserRouterHelper = require('../helpers/UserRouterHelper');
const RouterHelper = require("../helpers/RouterHelper");

module.exports = (app) => {
    const helper = new UserRouterHelper();

    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            req.token = bearer[1];
            next();
        } else
            RouterHelper.sendResponse(res, 403, 'authentication failed');
    }

    app.get("/users", (req, res) => helper.select(req, res));

    app.get("/users/:id", (req, res) => helper.selectOne(req, res));

    app.post("/users", (req, res) => helper.create(req, res));

    app.post("/login", (req, res) => helper.login(req, res));
};