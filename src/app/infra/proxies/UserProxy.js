const Proxy = require('./Proxy');
const db = require('../database');
const bcrypt = require('bcrypt');
const User = db.User;

class UserProxy extends Proxy {

    constructor() {
        super();
        this.model = User;
    }

    async login(email, password) {
        const user = await this.findByEmail(email);
        if (user)
            return bcrypt.compare(password, user.password);
        else
            return null;
    }

    findByEmail(email) {
        return this.model.findOne({
            where: {email}
        });
    }
}

module.exports = UserProxy;