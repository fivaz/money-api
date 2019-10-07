const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class Transaction extends Model {
}

Transaction.init({
        description: {type: Sequelize.STRING},
        value: {type: Sequelize.DOUBLE},
        date: {type: Sequelize.DATE},
        type: {type: Sequelize.STRING},
        isMonthly: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'transactions',
    }
);

module.exports = Transaction;
