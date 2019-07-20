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
    return seedAccount()
        .then(seedCategory())
        .then(seedTransaction());
}

function seedAccount() {
    return Account.create({name: "Bank"});
}

function seedCategory() {
    return Category.create({name: "Supermarket"});
}

function seedTransaction() {
    return Transaction.create({
        description: "Test1",
        value: 20.05,
        date: new Date(),
        type: "Spending",
        sourceAccountId: 1,
        categoryId: 1,
        destinationAccountId: null
    });
}