const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Transaction = db.Transaction;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    find(req, res) {
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
                let plainAccounts = [];
                accounts.forEach(account => {
                    let balance = 0;
                    account.transactions.forEach(transaction => {
                        balance = balance + transaction.value;
                    });
                    let plainAccount = account.get({plain: true});
                    plainAccount.balance = balance;
                    delete plainAccount.transactions;
                    plainAccounts.push(plainAccount);
                });
                res.json(plainAccounts);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }
}

module.exports = AccountProxy;