class Proxy {

    constructor() {
        this.model = null;
    }

    update(...args) {
        return this.model.update(...args);
    }

    destroy(...args) {
        return this.model.destroy(...args);
    }
}

module.exports = Proxy;