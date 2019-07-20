const Proxy = require('./Proxy');
const Transaction = require('../models/Transaction');

class TransactionProxy extends Proxy {

    constructor() {
        super();
        this.model = Transaction;
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