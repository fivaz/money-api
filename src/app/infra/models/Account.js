const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class Account extends Model {
}

Account.init(
    {name: {type: Sequelize.STRING}},
    {
        sequelize,
        modelName: 'accounts'
    }
);

module.exports = Account;