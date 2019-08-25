const UserProxy = require('../infra/proxies/UserProxy');
const RouterHelper = require('./RouterHelper');
const {signToken} = require('../../config/token-service');

class UserRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new UserProxy();
    }

    login(req, res) {
        const {email, password} = req.body;
        this.model.login(email, password)
            .then(user => {
                if (user)
                    res.json(signToken(user));
                else
                    RouterHelper.sendResponse(res, 401, 'authentication failed');
            });
    }

    create(req, res) {
        this.model.create(req.body)
            .then(user => res.json(signToken(user)))
            .catch(errors => RouterHelper.sendResponse(res, 409, errors));
    }

}

module.exports = UserRouterHelper;