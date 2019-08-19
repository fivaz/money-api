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
            .then(result => {
                const status = result ? 200 : 404;
                res.sendStatus(status);
            })
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }
}

module.exports = UserRouterHelper;