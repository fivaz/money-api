const Proxy = require('./Proxy');
const db = require('../database');
const bcrypt = require('bcrypt');
const User = db.User;

const SALT_ROUNDS = 10;

class UserProxy extends Proxy {

    constructor() {
        super();
        this.model = User;
    }

    async login(email, password) {
        const user = await this.findByEmail(email);
        if (user)
            if (await bcrypt.compare(password, user.password))
                return user;
        return null;
    }

    findByEmail(email) {
        return this.model.findOne({
            where: {email}
        });
    }

    async create(user) {
        const encryptedUser = {...user};
        encryptedUser.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        return this.model.create(encryptedUser);
    }
}

module.exports = UserProxy;