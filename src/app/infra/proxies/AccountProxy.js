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

    findFull(userId) {
        return this.model
            .findAll({
                where: {userId},
                include: [
                    {model: Transaction, as: 'transactionsFrom'},
                    {model: Transaction, as: 'transactionsTo'}
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
                        as: 'transactionsFrom',
                        include: [Category]
                    },
                    {
                        model: Transaction,
                        as: 'transactionsTo',
                        include: [Category]
                    },
                ],
                required: false
            })
            .then(account => AccountProxy.mergeTransactions(account));
    }

    static mergeTransactions(account) {
        account = account.get({plain: true});
        account.transactions = account.transactionsFrom.concat(account.transactionsTo);
        delete account.transactionsFrom;
        delete account.transactionsTo;
        return account;
    }

    findWithBalance(userId) {
        return this.findFull(userId)
            .then(accounts => accounts.map(account => this.addBalance(account)));
    }

    findOneWithBalance(id) {
        return this.findOneFull(id)
            .then(account => this.addBalance(account));
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
                if (account.id === transaction.destinationAccountId)
                    return transaction.value;
                if (account.id === transaction.sourceAccountId)
                    return -1 * transaction.value;
        }
    }

    getBalance(account) {
        const reducer = (total, transaction) => total + AccountProxy.getValue(account, transaction);
        const balance = account.transactions.reduce(reducer, 0);
        return Number(balance.toFixed(2));
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

    update(object, id) {
        return this.model
            .update(object, {where: {id}})
            .then(() => this.findOneWithBalance(id));
    }
}

module.exports = AccountProxy;