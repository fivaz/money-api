const db = require('./database');
const User = require('./models/User');
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

refreshDB(db.sequelize);

function seed() {
    return seedUsers()
        .then(Promise
            .all([seedAccounts(), seedCategories()])
            .then(seedTransactions()));
}

function seedUsers() {
    return Promise.all([
        User.create({
            firstName: "Stefane",
            lastName: "Fivaz",
            email: "stefane@user.com",
            password: "12345"
        }),
        User.create({
            firstName: "Test",
            lastName: "Test",
            email: "test@user.com",
            password: "12345"
        })
    ]);
}

function seedAccounts() {
    return Promise.all([
        Account.create({
            name: "Bank", userId: 1
        }),
        Account.create({
            name: "Wallet", userId: 2
        })
    ]);
}

function seedCategories() {
    return Promise.all([
        Category.create({
            name: "Supermarket",
            budget: 300,
            userId: 1
        }),
        Category.create({
            name: "Debts",
            budget: 1205.55,
            userId: 2
        })
    ]);
}

function seedTransactions() {
    return Promise.all([
        Transaction.create({
            description: "Transfer Bank to Wallet",
            value: 20.05,
            date: new Date(),
            type: "transfer",
            sourceAccountId: 1,
            categoryId: 1,
            destinationAccountId: 2
        }),
        Transaction.create({
            description: "Money of Wallet",
            value: 20.55,
            date: new Date(),
            type: "spending",
            sourceAccountId: 2,
            categoryId: 2
        }),
        Transaction.create({
            description: "Money of Wallet2",
            value: 20.55,
            date: new Date(),
            type: "spending",
            sourceAccountId: 2,
            categoryId: 2
        }),
        Transaction.create({
            description: "Money of Bank",
            value: 20.55,
            date: new Date(),
            type: "income",
            sourceAccountId: 1,
            categoryId: 2
        })
    ]);
}

module.exports = refreshDB;