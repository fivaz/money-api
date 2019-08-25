const CategoryRouterHelper = require('../helpers/CategoryRouterHelper');
const {verifyToken} = require('../../config/token-service');

module.exports = (app) => {
    const helper = new CategoryRouterHelper();

    app.get("/categories", verifyToken, (req, res) => helper.select(req, res));

    app.get("/categories/:id", verifyToken, (req, res) => helper.selectOne(req, res));

    app.post("/categories", verifyToken, (req, res) => helper.create(req, res));

    app.put("/categories/:id", verifyToken, (req, res) => helper.update(req, res));

    app.delete("/categories/:id", verifyToken, (req, res) => helper.delete(req, res));
};