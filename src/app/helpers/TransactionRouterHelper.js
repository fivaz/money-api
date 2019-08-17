const TransactionProxy = require('../infra/proxies/TransactionProxy');
const RouterHelper = require('./RouterHelper');

class TransactionRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new TransactionProxy();
    }

    selectFrom(req, res) {
        this.model.findFrom(req.params.accountId)
            .then(rows => res.json(rows))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }
}

module.exports = TransactionRouterHelper;