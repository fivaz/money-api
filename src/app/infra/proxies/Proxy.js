class Proxy {

    constructor() {
        this.model = null;
    }

    findAll(...args) {
        return this.model.findAll(...args);
    }

    findOne(...args) {
        return this.model.findOne(...args);
    }

    findByPk(pk) {
        return this.model.findByPk(pk);
    }

    update(object, id) {
        return this.model
            .update(object, {where: {id}})
            .then(() => this.model.findByPk(id));
    }

    destroy(...args) {
        return this.model.destroy(...args);
    }

    create(...args) {
        return this.model.create(...args);
    }
}

module.exports = Proxy;