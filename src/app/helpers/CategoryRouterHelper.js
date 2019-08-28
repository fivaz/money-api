const CategoryProxy = require('../infra/proxies/CategoryProxy');
const RouterHelper = require('./RouterHelper');

class CategoryRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new CategoryProxy();
    }

    selectFrom(req, res) {
        return this.model.findAll({
            where:
                {userId: req.locals.user.id}
        })
            .then(categories => res.json(categories))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    create(req, res) {
        const category = req.body;
        category.userId = req.locals.user.id;
        this.model.create(category)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    update(req, res) {
        const category = req.body;
        category.userId = req.locals.user.id;
        this.model.update(category, req.params.id)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

}

module.exports = CategoryRouterHelper;