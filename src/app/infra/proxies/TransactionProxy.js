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

    findAll(req, res) {
        this.model
            .findAll({
                include: [
                    {model: Category},
                    {
                        model: Account,
                        as: 'sourceAccount'
                    },
                    {
                        model: Account,
                        as: 'destinationAccount'
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

    find(req, res) {
        this.model
            .findByPk(req.params.id)
            .then(transaction => {
                if (transaction) {
                    transaction.getSourceAccount()
                        .then(category => res.json(category));
                } else
                    res.sendStatus(204);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    /*
    create(req, res) {
        Account.findOne(req.body.sourceAccount,
            (errors, account) => {
                if (errors)
                    console.log(errors);
                else if (!account)
                    res.sendStatus(412);
                else {
                    this.model.create(req.body,
                        (errors, transaction) => {
                            if (errors)
                                res.json(pretty(errors));
                            else
                                res.json(transaction);
                        });
                }
            });
    }

    find(req, res) {
        this.model.find(
            {
                sourceAccount:
                    {_id: req.params.accountId}
            },
            (errors, rows) => {
                if (errors)
                    console.log(errors);
                else
                    res.json(rows);
            });
    }
     */
}

module.exports = TransactionProxy;