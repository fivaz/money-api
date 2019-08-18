const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Model = Sequelize.Model;
// const refreshDB = require('./refresh');

const Account = require('./models/Account');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');

Transaction.belongsTo(Account, {as: 'sourceAccount', foreignKey: 'sourceAccountId'});
Transaction.belongsTo(Account, {as: 'destinationAccount', foreignKey: 'destinationAccountId'});
Account.hasMany(Transaction, {as: 'transactionsFrom', foreignKey: 'sourceAccountId'});
Account.hasMany(Transaction, {as: 'transactionsTo', foreignKey: 'destinationAccountId'});
Transaction.belongsTo(Category, {foreignKey: 'categoryId'});
Category.hasMany(Transaction, {foreignKey: 'categoryId'});

// refreshDB(sequelize);

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;
db.Account = Account;
db.Category = Category;
db.Transaction = Transaction;

module.exports = db;


