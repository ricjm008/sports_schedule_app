const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Score.init(
    {
        h_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        a_team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        h_score: {
            type: DataTypes.NUMBER,

        },
        a_score: {
            type: DataTypes.NUMBER
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'game',
                key: 'id'
            }
        }
        
    },
    {
        hooks: {},
        sequelize,
        modelName: 'score',
    }
);

module.exports = Score;