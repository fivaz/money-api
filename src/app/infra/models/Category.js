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


// Category.hasMany(Transaction);

module.exports = Category;
