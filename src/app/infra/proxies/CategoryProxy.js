const Proxy = require('./Proxy');
const db = require('../database');
const Category = db.Category;

class CategoryProxy extends Proxy {

    constructor() {
        super();
        this.model = Category;
    }
}

module.exports = CategoryProxy;