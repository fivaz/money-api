const Proxy = require('./Proxy');
const db = require('../database');
const User = db.User;

class UserProxy extends Proxy {

    constructor() {
        super();
        this.model = User;
    }

    login(email, password) {
        this.model.findOne({
            where: {email, password}
        }).then(result => result !== null);
    }
}

module.exports = UserProxy;