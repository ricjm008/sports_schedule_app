const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Score.init(
    {
        winner_id: {
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
        modelName: 'score',
    }
);

module.exports = Score;