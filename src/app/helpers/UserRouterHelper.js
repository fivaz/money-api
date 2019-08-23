const UserProxy = require('../infra/proxies/UserProxy');
const RouterHelper = require('./RouterHelper');

class UserRouterHelper extends RouterHelper {

    constructor() {
        super();
        this.model = new UserProxy();
    }

    login(req, res) {
        this.model
            .login(req.body.email, req.body.password)
            .then(user => {
                if (user)
                    res.json(user);
                else
                    res.sendStatus(401);
            })
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }
}

module.exports = UserRouterHelper;