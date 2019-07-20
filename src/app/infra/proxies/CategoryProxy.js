const Proxy = require('./Proxy');
const db = require('../database');
const Category = db.Category;
const Transaction = db.Transaction;

class CategoryProxy extends Proxy {

    constructor() {
        super();
        this.model = Category;
    }

    findAll(req, res) {
        this.model
            .findAll({
                include: [{
                    model: Transaction
                }]
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
            .findByPk(req.params.id, {
                include: [{
                    model: Transaction
                }]
            })
            .then(account => {
                res.json(account);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }
}

module.exports = CategoryProxy;