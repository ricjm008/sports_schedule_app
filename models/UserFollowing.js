const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFollowing extends Model {}

// Remember id, created_date, updated_date columns are created for you.
UserFollowing.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            }
        }
    },
    {
        hooks: {},
        sequelize,
        modelName: 'userfollowing',
    }
);

module.exports = UserFollowing;