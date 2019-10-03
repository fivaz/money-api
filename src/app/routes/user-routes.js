const UserRouterHelper = require('../helpers/UserRouterHelper');
const {verifyToken} = require('../../config/token-service');

module.exports = (app) => {
    const helper = new UserRouterHelper();

    app.get("/users", verifyToken, (req, res) => helper.select(req, res));

    app.get("/users/:id", verifyToken, (req, res) => helper.selectOne(req, res));

    app.post("/register", (req, res) => helper.create(req, res));

    app.post("/login", (req, res) => helper.login(req, res));

    app.delete("/users/:id", verifyToken, (req, res) => helper.delete(req, res));
};