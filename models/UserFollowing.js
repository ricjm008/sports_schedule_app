const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFollowing extends Model {}

// Remember id, created_date, updated_date columns are created for you.
UserFollowing.init(
    {
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        hooks: {},
        sequelize,
        freezeTableName: true,
        modelName: 'userfollowing',
    }
);

module.exports = UserFollowing;