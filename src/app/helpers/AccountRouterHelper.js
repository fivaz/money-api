const AccountProxy = require('../infra/proxies/AccountProxy');

class AccountRouterHelper {

    constructor() {
        this.model = new AccountProxy();
    }

    static _handleError(res, code, errors) {
        res.json({
            status: code,
            message: errors
        })
    }

    select(req, res) {
        this.model.findFull()
            .then(rows => res.json(rows))
            .catch(errors => AccountRouterHelper._handleError(res, 412, errors));
    }

    selectOne(req, res) {
        this.model.find(req.params.id)
            .then(row => res.json(row))
            .catch(errors => AccountRouterHelper._handleError(res, 412, errors));
    }

    create(req, res) {
        this.model.create(req.body)
            .then(row => res.json(row))
            .catch(errors => AccountRouterHelper._handleError(res, 412, errors));
    }

    findAll(req, res) {
        this.model
            .findAll()
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
            .then(row => {
                if (row)
                    res.json(row);
                else
                    res.sendStatus(204);
            })
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    delete(req, res) {
        this.model
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.sendStatus(204))
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }

    update(req, res) {
        this.model
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.sendStatus(200))
            .catch(errors =>
                res.json({
                    status: 412,
                    message: errors
                }));
    }
}

module.exports = AccountRouterHelper;