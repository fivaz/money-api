const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class Category extends Model {
}

Category.init(
    {
        name: {type: Sequelize.STRING},
        budget: {type: Sequelize.DOUBLE}
    },
    {
        sequelize,
        modelName: 'categories',
        paranoid: true
    });

module.exports = Category;
