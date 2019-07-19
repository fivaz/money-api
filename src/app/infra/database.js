const Sequelize = require('sequelize');
const sequelize = new Sequelize('money', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

const Model = Sequelize.Model;

class Account extends Model {
}

Account.init(
    {name: {type: Sequelize.STRING}},
    {sequelize, modelName: 'accounts'}
);

class Category extends Model {
}

Category.init(
    {name: {type: Sequelize.STRING}},
    {sequelize, modelName: 'categories'});

class Transaction extends Model {
}

Transaction.init({
        description: {type: Sequelize.STRING},
        value: {type: Sequelize.DOUBLE},
        date: {type: Sequelize.DATE},
        type: {type: Sequelize.STRING},
        category: {
            type: Sequelize.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
        sourceAccount: {
            type: Sequelize.INTEGER,
            references: {
                model: Account,
                key: 'id'
            }
        },
        destinationAccount: {
            type: Sequelize.INTEGER,
            references: {
                model: Account,
                key: 'id'
            }
        }
    },
    {sequelize, modelName: 'transactions'}
);


/*
Accounts.create({name: "Bank"});
Categories.create({name: "Supermarket"});
Transactions.create({
    description: "Test1",
    value: 20.05,
    date: new Date(),
    type: "Spending",
    sourceAccount: 1,
    destinationAccount: null
});
*/

// Account.sync({force: true});
// Category.sync({force: true});
Transaction.sync({force: true});

module.exports = sequelize;