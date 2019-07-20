const CategoryProxy = require('../infra/proxies/CategoryProxy');

module.exports = (app) => {

    const categoryProxy = new CategoryProxy();

    app.get("/categories", (req, res) =>
        categoryProxy.findAll(req, res));

    app.post("/categories", (req, res) =>
        categoryProxy.create(req, res));

    app.get("/categories/:id", (req, res) =>
        categoryProxy.find(req, res));

    app.delete("/categories/:id", (req, res) =>
        categoryProxy.delete(req, res));

    app.put("/categories/:id", (req, res) =>
        categoryProxy.update(req, res));

};