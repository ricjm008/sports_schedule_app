const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

// Remember id, created_date, updated_date columns are created for you.
User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        league: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'league',
                key: 'id'
            }
        },
        logo: {
            type: DataTypes.BLOB,

        },
        
    },
    {
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created/updated, we will automatically hash their password
        hooks: {},
        sequelize,
        modelName: 'team',
    }
);

module.exports = User;