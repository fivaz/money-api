const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Transaction = db.Transaction;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    findFull() {
        return new Promise((resolve, reject) => {
            this.model
                .findAll({
                    include: [
                        {model: Transaction, as: 'transactions_from'},
                        {model: Transaction, as: 'transactions_to'},
                    ]
                })
                .then(accounts => {
                    accounts = accounts.map(account => AccountProxy.mergeTransactions(account));
                    resolve(accounts);
                })
                .catch(errors => reject(errors));
        });
    }

    findOneFull(id) {
        return new Promise((resolve, reject) => {
            this.model
                .findByPk(id, {
                    include: [
                        {model: Transaction, as: 'transactions_from'},
                        {model: Transaction, as: 'transactions_to'},
                    ]
                })
                .then(account => {
                    account = AccountProxy.mergeTransactions(account);
                    resolve(account);
                })
                .catch(errors => reject(errors));
        });
    }

    static mergeTransactions(account) {
        account = account.get({plain: true});
        account.transactions = account.transactions_from.concat(account.transactions_to);
        delete account.transactions_from;
        delete account.transactions_to;
        return account;
    }

    findWithBalance() {
        return new Promise((resolve, reject) => {
            this.findFull()
                .then(accounts => {
                    accounts = accounts.map(account => this.addBalance(account));
                    resolve(accounts);
                })
                .catch(errors => reject(errors));
        });
    }

    addBalance(account) {
        account.balance = this.getBalance(account);
        delete account.transactions;
        return account;
    }

    static getValue(account, transaction) {
        switch (transaction.type) {
            case "income":
                return transaction.value;
            case "spending":
                return -1 * transaction.value;
            case "transfer":
                if (account.id === transaction.destination_account_id)
                    return transaction.value;
                if (account.id === transaction.source_account_id)
                    return -1 * transaction.value;
        }
    }

    getBalance(account) {
        const reducer = (total, transaction) => total + AccountProxy.getValue(account, transaction);
        return account.transactions.reduce(reducer, 0).toFixed(2);
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.model
                .create(data)
                .then(account => {
                    account = account.get({plain: true});
                    account.balance = 0;
                    resolve(account);
                })
                .catch(errors => reject(errors));
        });
    }
}

module.exports = AccountProxy;