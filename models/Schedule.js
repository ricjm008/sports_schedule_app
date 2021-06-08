const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

// Remember id, created_date, updated_date columns are created for you.
User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created/updated, we will automatically hash their password
        hooks: {},
        sequelize,
        modelName: 'schedule',
    }
);

module.exports = User;