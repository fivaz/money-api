const UserProxy = require('../infra/proxies/UserProxy');
const RouterHelper = require('./RouterHelper');

class UserRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new UserProxy();
    }
}

module.exports = UserRouterHelper;