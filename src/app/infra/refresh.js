const db = require('./database');
const Account = require('./models/Account');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => db.sequelize.sync({force: true}))
    .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
    .then(() => seed())
    .then(() => console.log("Database refreshed"))
    .catch(err => console.log(err));

function seed() {
    return Promise.all([seedAccount(), seedCategory()])
        .then(seedTransaction());
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
            description: "Test1",
            value: 20.05,
            date: new Date(),
            type: "spending",
            sourceAccountId: 1,
            categoryId: 1,
            destinationAccountId: null
        }),
        Transaction.create({
            description: "Test2",
            value: 20.55,
            date: new Date(),
            type: "income",
            sourceAccountId: 2,
            categoryId: 2,
            destinationAccountId: 1
        }),
        Transaction.create({
            description: "Test3",
            value: 20.55,
            date: new Date(),
            type: "income",
            sourceAccountId: 2,
            categoryId: 2,
            destinationAccountId: null
        })
    ]);
}