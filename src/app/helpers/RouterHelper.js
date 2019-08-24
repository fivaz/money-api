const Proxy = require('../infra/proxies/Proxy');

class RouterHelper {

    constructor() {
        /**
         * @type {Proxy}
         */
        this.model = null;
    }

    static sendResponse(res, status, message) {
        res.json({status, message});
    }

    select(req, res) {
        this.model.findAll()
            .then(rows => res.json(rows))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    selectOne(req, res) {
        this.model.findByPk(req.params.id)
            .then(row => {
                if (row)
                    res.json(row);
                else
                    res.sendStatus(204);
            })
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    create(req, res) {
        this.model.create(req.body)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    delete(req, res) {
        this.model
            .destroy({
                where: {id: req.params.id}
            })
            .then(() => res.sendStatus(204))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }

    update(req, res) {
        this.model
            .update(req.body, req.params.id)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.sendResponse(res, 412, errors));
    }
}

module.exports = RouterHelper;