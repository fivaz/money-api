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

    findPopulated(req, res) {
        this.model
            .findAll({
                include: [
                    {model: Category},
                    {
                        model: Account,
                        as: 'source_account'
                    },
                    {
                        model: Account,
                        as: 'destination_account'
                    }
                ]
            })
            .then(rows => res.json(rows))
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
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