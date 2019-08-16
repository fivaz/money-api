const AccountProxy = require('../infra/proxies/AccountProxy');
const RouterHelper = require('./RouterHelper');

class AccountRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new AccountProxy();
    }
}

module.exports = AccountRouterHelper;