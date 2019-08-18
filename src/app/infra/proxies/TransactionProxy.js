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

    findFull() {
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
}

module.exports = TransactionProxy;