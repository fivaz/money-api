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
}

module.exports = UserRouterHelper;