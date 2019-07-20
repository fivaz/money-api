const Proxy = require('./Proxy');
const Category = require('../models/Category');

class CategoryProxy extends Proxy {

    constructor() {
        super();
        this.model = Category;
    }
}

module.exports = CategoryProxy;