const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Transaction = db.Transaction;
const Category = db.Category;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    findFull() {
        return this.model
            .findAll({
                include: [
                    {model: Transaction, as: 'transactions_from'},
                    {model: Transaction, as: 'transactions_to'},
                ],
                required: false
            })
            .then(accounts => accounts.map(account => AccountProxy.mergeTransactions(account)));
    }

    findOneFull(id) {
        return this.model
            .findByPk(id, {
                include: [
                    {
                        model: Transaction,
                        as: 'transactions_from',
                        include: [Category]
                    },
                    {
                        model: Transaction,
                        as: 'transactions_to',
                        include: [Category]
                    },
                ],
                required: false
            })
            .then(account => AccountProxy.mergeTransactions(account));
    }

    static mergeTransactions(account) {
        account = account.get({plain: true});
        account.transactions = account.transactions_from.concat(account.transactions_to);
        delete account.transactions_from;
        delete account.transactions_to;
        return account;
    }

    findWithBalance() {
        return this.findFull()
            .then(accounts => accounts.map(account => this.addBalance(account)));
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
        return this.model
            .create(data)
            .then(account => {
                account = account.get({plain: true});
                account.balance = 0;
                return account;
            });
    }
}

module.exports = AccountProxy;