const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFollowing extends Model {}

// Remember id, created_date, updated_date columns are created for you.
UserFollowing.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {},
        sequelize,
        modelName: 'userfollowing',
    }
);

module.exports = UserFollowing;