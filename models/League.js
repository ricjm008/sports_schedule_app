const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class League extends Model {}

// Remember id, created_date, updated_date columns are created for you.
League.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        hooks: {},
        sequelize,
        freezeTableName: true,
        modelName: 'league',
    }
);

module.exports = League;