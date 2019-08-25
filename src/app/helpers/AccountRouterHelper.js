const AccountProxy = require('../infra/proxies/AccountProxy');
const RouterHelper = require('./RouterHelper');

class AccountRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new AccountProxy();
    }

    selectFrom(req, res) {
        this.model
            .findWithBalance(req.params.userId)
            .then(rows => res.json(rows))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    selectOne(req, res) {
        this.model
            .findOneFull(req.params.id)
            .then(row => {
                if (row)
                    res.json(row);
                else
                    res.sendStatus(204);
            })
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }
}

module.exports = AccountRouterHelper;