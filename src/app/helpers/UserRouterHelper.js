const UserProxy = require('../infra/proxies/UserProxy');
const RouterHelper = require('./RouterHelper');

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
                    res.json(user);
                else
                    RouterHelper.sendResponse(res, 401, 'authentication failed');
            });
    }

    create(req, res) {
        this.model.create(req.body)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 409, errors));
    }

}

module.exports = UserRouterHelper;