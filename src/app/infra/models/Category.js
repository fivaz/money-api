const db = require('../database');

class Category extends db.Model {
}

Category.init(
    {
        name: {type: db.Sequelize.STRING},
        budget: {type: db.Sequelize.DOUBLE}
    },
    {
        sequelize: db.sequelize,
        modelName: 'categories'
    });

module.exports = Category;
