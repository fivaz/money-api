const Proxy = require('./Proxy');
const db = require('../database');
const Account = db.Account;

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    find(req, res) {
        this.model
            .findByPk(req.params.id)
            .then(account => {
                    account.getTransactions()
                        .then(transactions =>
                            res.json(transactions));
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    // findWithTransactions(req, res) {
    //     this.model.findOne({_id: req.params.id}, (errors, account) => {
    //         if (errors)
    //             console.log(errors);
    //         else if (!account)
    //             res.sendStatus(404);
    //         else {
    //             account.getTransactions((errors, transactions) => {
    //                 if (errors)
    //                     console.log(errors);
    //                 else {
    //                     account.transactions = transactions;
    //                     res.json(account);
    //                 }
    //             });
    //         }
    //     });
    // }

    // findWithPopulatedTransactions(req, res) {
    //     this.model.find({_id: req.params.id}, (errors, account) => {
    //         if (errors)
    //             console.log(errors);
    //         else if (!account)
    //             res.sendStatus(404);
    //         else {
    //             account.getTransactions((errors, transactions) => {
    //                 if (errors)
    //                     console.log(errors);
    //                 else {
    //                     account.transactions = transactions;
    //                     res.json(account);
    //                 }
    //             });
    //         }
    //     });
    // }
}

module.exports = AccountProxy;