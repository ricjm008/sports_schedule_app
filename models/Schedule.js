const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Schedule extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Schedule.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {},
        sequelize,
        freezeTableName: true,
        modelName: 'schedule',
    }
);

module.exports = Schedule;