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
                        as: 'source_account'
                    },
                    {
                        model: Account,
                        as: 'destination_account'
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
                        {source_account_id: accountId},
                        {
                            [Op.and]: [
                                {destination_account_id: accountId},
                                {type: "transfer"}
                            ]
                        },
                    ]
                }
            });
    }
}

module.exports = TransactionProxy;