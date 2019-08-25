const AccountProxy = require('../infra/proxies/AccountProxy');
const RouterHelper = require('./RouterHelper');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretkey';

class AccountRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new AccountProxy();
    }

    selectFrom(req, res) {
        return jwt.verify(req.token, TOKEN_SECRET, (err, authData) => {
            if (err)
                RouterHelper.sendResponse(res, 401, 'Unauthorized');
            else {
                return this.model.findWithBalance(authData.user.id)
                    .then(rows => res.json(rows))
                    .catch(errors => RouterHelper.sendResponse(res, 412, errors));
            }
        });
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