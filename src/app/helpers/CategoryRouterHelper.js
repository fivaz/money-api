const CategoryProxy = require('../infra/proxies/CategoryProxy');
const RouterHelper = require('./RouterHelper');

class CategoryRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new CategoryProxy();
    }
}

module.exports = CategoryRouterHelper;