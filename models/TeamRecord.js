const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TeamRecord extends Model {}

// Remember id, created_date, updated_date columns are created for you.
TeamRecord.init(
    {
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id'
            }
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ties: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    },
    {
        hooks: {},
        sequelize,
        modelName: 'teamrecord',
    }
);

module.exports = TeamRecord;