const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TeamRecord extends Model {}

// Remember id, created_date, updated_date columns are created for you.
TeamRecord.init(
    {
        result: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    },
    {
        hooks: {},
        sequelize,
        freezeTableName: true,
        modelName: 'teamrecord',
    }
);

module.exports = TeamRecord;