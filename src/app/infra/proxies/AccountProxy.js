const Proxy = require('./Proxy');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

class AccountProxy extends Proxy {

    constructor() {
        super();
        this.model = Account;
    }

    findAll(req, res) {
        this.model
            .findAll({
                include: [
                    {model: Transaction}
                ]
            })
            .then(rows => res.json(rows))
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