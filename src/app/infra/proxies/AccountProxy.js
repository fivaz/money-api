const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Transaction = db.Transaction;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
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
                this.getTransactions(account);
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

    getTransactions(account) {
        account.transactions = [...account.transactionsFrom];
        account.transactionsTo.forEach(newTransaction => {
            const isDifferent = account.transactions.every(transaction =>
                ((newTransaction.type === "transfer") && (transaction.id != newTransaction.id)));
            if (isDifferent)
                account.transactions.push(newTransaction);
        });
        delete account.transactionsFrom;
        delete account.transactionsTo;
        return account;
    }

    addBalance(account) {
        account = account.get({plain: true});
        this.getTransactions(account);
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