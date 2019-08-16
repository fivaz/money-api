class RouterHelper {

    constructor() {
        this.model = null;
    }

    static handleError(res, code, errors) {
        res.json({
            status: code,
            message: errors
        })
    }

    _handlePromise(promise, res) {
        promise.then(rows => res.json(rows))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }

    select(req, res) {
        this._handlePromise(this.model.findFull(), res);
    }

    selectOne(req, res) {
        this.model.find(req.params.id)
            .then(row => {
                if (row)
                    res.json(row);
                else
                    res.sendStatus(204);
            })
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }

    create(req, res) {
        this.model.create(req.body)
            .then(row => res.json(row))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }

    delete(req, res) {
        this.model
            .destroy({
                where: {id: req.params.id}
            })
            .then(() => res.sendStatus(204))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }

    update(req, res) {
        this.model
            .update(req.body, {
                where: {id: req.params.id}
            })
            .then(() => res.sendStatus(200))
            .catch(errors => RouterHelper.handleError(res, 412, errors));
    }
}

module.exports = RouterHelper;