const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class User extends Model {
}

User.init(
    {
        firstName: {type: Sequelize.STRING},
        lastName: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    },
    {
        sequelize,
        modelName: 'users'
    });

module.exports = User;
