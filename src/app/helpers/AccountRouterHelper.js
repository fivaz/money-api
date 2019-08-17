const AccountProxy = require('../infra/proxies/AccountProxy');
const RouterHelper = require('./RouterHelper');

class AccountRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new AccountProxy();
    }

    select(req, res) {
        this.model
            .findWithBalance()
            .then(rows => res.json(rows))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }
}

module.exports = AccountRouterHelper;