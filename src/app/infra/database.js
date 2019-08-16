const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Model = Sequelize.Model;
// const refreshDB = require('./refresh');

const Account = require('./models/Account');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');

Transaction.belongsTo(Account, {as: 'source_account'});
Transaction.belongsTo(Account, {as: 'destination_account'});
Account.hasMany(Transaction, {as: 'transactions_from', foreignKey: 'source_account_id'});
Account.hasMany(Transaction, {as: 'transactions_to', foreignKey: 'destination_account_id'});
Transaction.belongsTo(Category, {foreignKey: 'category_id'});
Category.hasMany(Transaction, {foreignKey: 'category_id'});

// refreshDB(sequelize);

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;
db.Account = Account;
db.Category = Category;
db.Transaction = Transaction;

module.exports = db;


