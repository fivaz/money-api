const AccountProxy = require('../infra/proxies/AccountProxy');
const RouterHelper = require('./RouterHelper');

class AccountRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new AccountProxy();
    }

    selectFrom(req, res) {
        return this.model.findWithBalance(req.locals.user.id)
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

    create(req, res) {
        const account = req.body;
        account.userId = req.locals.user.id;
        this.model.create(account)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    update(req, res) {
        const account = req.body;
        account.userId = req.locals.user.id;
        this.model.update(account, req.params.id)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

}

module.exports = AccountRouterHelper;