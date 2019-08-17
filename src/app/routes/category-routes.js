const CategoryRouterHelper = require('../helpers/CategoryRouterHelper');

module.exports = (app) => {
    const helper = new CategoryRouterHelper();

    app.get("/categories", (req, res) => helper.select(req, res));

    app.get("/categories/:id", (req, res) => helper.selectOne(req, res));

    app.post("/categories", (req, res) => helper.create(req, res));

    app.put("/categories/:id", (req, res) => helper.update(req, res));

    app.delete("/categories/:id", (req, res) => helper.delete(req, res));
};