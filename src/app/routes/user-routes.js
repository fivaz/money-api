const UserRouterHelper = require('../helpers/UserRouterHelper');

module.exports = (app) => {
    const helper = new UserRouterHelper();

    app.get("/users", (req, res) => helper.select(req, res));

    app.get("/users/:id", (req, res) => helper.selectOne(req, res));

    app.post("/register", (req, res) => helper.create(req, res));

    app.post("/login", (req, res) => helper.login(req, res));
};