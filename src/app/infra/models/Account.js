const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class Account extends Model {
}

Account.init(
    {name: {type: Sequelize.STRING}},
    {
        underscored: true,
        sequelize,
        modelName: 'accounts'
    }
);

module.exports = Account;