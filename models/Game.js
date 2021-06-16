const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Game.init(
    {
        h_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        date_time: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        hooks: {},
        sequelize,
        freezeTableName: true,
        modelName: 'game',
    }
);

module.exports = Game;