const db = require('../database');
const Account = require('./Account');
const Category = require('./Category');

class Transaction extends db.Model {
}

Transaction.init({
        description: {type: db.Sequelize.STRING},
        value: {type: db.Sequelize.DOUBLE},
        date: {type: db.Sequelize.DATE},
        type: {type: db.Sequelize.STRING}
    },
    {
        sequelize: db.sequelize,
        modelName: 'transactions'
    }
);

Transaction.belongsTo(Account, {as: 'sourceAccount'});
Transaction.belongsTo(Account, {as: 'destinationAccount'});
Transaction.belongsTo(Category);

module.exports = Transaction;
