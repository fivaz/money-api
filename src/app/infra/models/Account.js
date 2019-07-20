const db = require('../database');

class Account extends db.Model {
}

Account.init(
    {name: {type: db.Sequelize.STRING}},
    {
        sequelize: db.sequelize,
        modelName: 'accounts'
    }
);

module.exports = Account;