const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;
const Category = db.Category;
const Transaction = db.Transaction;

class TransactionProxy extends Proxy {

    constructor() {
        super();
        this.model = Transaction;
    }

    findAllFull() {
        return this.model
            .findAll({
                include: [
                    {
                        model: Account,
                        as: 'sourceAccount'
                    },
                    {
                        model: Account,
                        as: 'destinationAccount'
                    },
                    Category
                ]
            });
    }

    findOneFull(id) {
        return this.model
            .findByPk(id, {
                include: [
                    {
                        model: Account,
                        as: 'sourceAccount'
                    },
                    {
                        model: Account,
                        as: 'destinationAccount'
                    },
                    Category
                ]
            });
    }

    findFrom(accountId) {
        const Op = db.Sequelize.Op;
        return this.model
            .findAll({
                where: {
                    [Op.or]: [
                        {sourceAccountId: accountId},
                        {
                            [Op.and]: [
                                {destinationAccountId: accountId},
                                {type: "transfer"}
                            ]
                        },
                    ]
                }
            });
    }

    findMonthly() {
        return this.model.findAll({where: {isMonthly: 1}});
    }

    update(transaction, id) {
        return this.model
            .update(transaction, {where: {id}})
            .then(() => this.findOneFull(id));
    }

    create(transaction) {
        return this.model
            .create(transaction)
            .then(transaction => this.findOneFull(transaction.id));
    }

    setNonMonthly(transaction) {
        const transactionRaw = transaction.get({plain: true});
        transactionRaw.isMonthly = 0;
        return this.model.update(transactionRaw, {where: {id: transactionRaw.id}});
    }

    createMonthlyIn(transaction, date) {
        const transactionRaw = transaction.get({plain: true});
        delete transactionRaw.id;
        transactionRaw.isMonthly = 1;
        transactionRaw.date = date;
        return this.model.create(transactionRaw);
    }

    createIn(transaction, date) {
        const transactionRaw = transaction.get({plain: true});
        delete transactionRaw.id;
        transactionRaw.isMonthly = 0;
        transactionRaw.date = date;
        return this.model.create(transactionRaw);
    }
}

module.exports = TransactionProxy;