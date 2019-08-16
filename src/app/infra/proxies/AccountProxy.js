const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Transaction = db.Transaction;
const Sequelize = db.Sequelize;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    findFull(req, res) {
        this.model
            .findAll({
                include: [
                    {
                        model: Transaction,
                        as: 'transactions_from'
                    },
                    {
                        model: Transaction,
                        as: 'transactions_to'
                    }
                ]
            })
            .then(accounts => {
                accounts = accounts.map(account => AccountProxy.mergeTransactions(account));
                res.json(accounts);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    findWithTransactions(req, res) {
        this.model
            .findByPk(req.params.id,
                {
                    include: [
                        {
                            model: Transaction,
                            as: 'transactionsFrom'
                        },
                        {
                            model: Transaction,
                            as: 'transactionsTo'
                        }
                    ]
                })
            .then(account => {
                account = account.get({plain: true});
                AccountProxy.mergeTransactions(account);
                res.json(account);
            })
            .catch(errors => {
                console.log(errors);
                res.json({
                    status: 412,
                    message: errors
                })
            });
    }

    create(req, res) {
        this.model
            .create(req.body)
            .then(account => {
                account = account.get({plain: true});
                account.balance = 0;
                res.json(account);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    getValue(account, transaction) {
        switch (transaction.type) {
            case "income":
                return transaction.value;
            case "spending":
                return -1 * transaction.value;
            case "transfer":
                if (account.id === transaction.destinationAccountId)
                    return transaction.value;
                if (account.id === transaction.sourceAccountId)
                    return -1 * transaction.value;
        }
    }

    //TODO ref this method using SUM and maybe group by to make it faster
    findAllWithBalance(req, res) {
        this.model
            .findAll(
                {
                    include: [
                        {
                            model: Transaction,
                            as: 'transactionsFrom'
                        },
                        {
                            model: Transaction,
                            as: 'transactionsTo'
                        }
                    ]
                })
            .then(accounts => {
                accounts = accounts.map(account => this.addBalance(account));
                res.json(accounts);
            })
            .catch(errors => {
                console.log(errors);
                res.json({
                    status: 412,
                    message: errors
                })
            });
    }

    static mergeTransactions(account) {
        account = account.get({plain: true});
        account.transactions = account.transactions_from.concat(account.transactions_to);
        delete account.transactions_from;
        delete account.transactions_to;
        return account;
    }

    addBalance(account) {
        account = account.get({plain: true});
        AccountProxy.mergeTransactions(account);
        account.balance = this.getBalance(account);
        delete account.transactions;
        return account;
    }

    getBalance(account) {
        const reducer = (total, transaction) => total + this.getValue(account, transaction);
        return account.transactions.reduce(reducer, 0).toFixed(2);
    }
}

module.exports = AccountProxy;