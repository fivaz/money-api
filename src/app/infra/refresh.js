const db = require('./database');
const Account = require('./models/Account');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');

const refreshDB = (sequelize = db.sequelize) => {
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => sequelize.sync({force: true}))
        .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => seed())
        .then(() => console.log("Database refreshed"))
        .catch(err => console.log(err));
};

refreshDB();

function seed() {
    return Promise.all([seedAccount(), seedCategory()]).then(seedTransaction());
}

function seedAccount() {
    return Promise.all([
        Account.create({name: "Bank"}),
        Account.create({name: "Wallet"})
    ]);
}

function seedCategory() {
    return Promise.all([
        Category.create(
            {
                name: "Supermarket",
                budget: 300
            }
        ),
        Category.create(
            {
                name: "Debts",
                budget: 1205.55
            }
        )
    ]);
}

function seedTransaction() {
    return Promise.all([
        Transaction.create({
            description: "Transfer Bank to Wallet",
            value: 20.05,
            date: new Date(),
            type: "transfer",
            source_account_id: 1,
            category_id: 1,
            destination_account_id: 2
        }),
        Transaction.create({
            description: "Money of Wallet",
            value: 20.55,
            date: new Date(),
            type: "spending",
            source_account_id: 2,
            category_id: 2
        }),
        Transaction.create({
            description: "Money of Wallet2",
            value: 20.55,
            date: new Date(),
            type: "spending",
            source_account_id: 2,
            category_id: 2
        }),
        Transaction.create({
            description: "Money of Bank",
            value: 20.55,
            date: new Date(),
            type: "income",
            source_account_id: 1,
            category_id: 2
        })
    ]);
}

module.exports = refreshDB;