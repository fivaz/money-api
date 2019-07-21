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
                        {model: Transaction}
                    ]
                })
            .then(account => res.json(account))
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
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

    getValue(transaction) {
        switch (transaction.type) {
            case "income":
                return transaction.value;
            case "spending":
                return -1 * transaction.value;
            case "transfer":
                if (this.id === transaction.destinationAccountId)
                    return transaction.value;
                if (this.id === transaction.sourceAccountId)
                    return -1 * transaction.value;
        }
    }

    //TODO ref this method using SUM and maybe group by to make it faster
    findWithBalance(req, res) {
        this.model
            .findAll(
                {
                    include: [
                        {model: Transaction}
                    ]
                })
            .then(accounts => {
                accounts = accounts.map(account => this.format(account));
                res.json(accounts);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    format(account) {
        account = account.get({plain: true});
        account.balance = this.getBalance(account);
        delete account.transactions;
        return account;
    }

    getBalance(account) {
        const reducer = (total, transaction) => total + this.getValue(transaction);
        return account.transactions.reduce(reducer, 0).toFixed(2);
    }
}

module.exports = AccountProxy;