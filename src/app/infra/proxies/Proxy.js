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

    update(...args) {
        return this.model.update(...args);
    }

    destroy(...args) {
        return this.model.destroy(...args);
    }
}

module.exports = Proxy;