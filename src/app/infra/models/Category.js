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
        underscored: true,
        sequelize,
        modelName: 'categories'
    });

module.exports = Category;
