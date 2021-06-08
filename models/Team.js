const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Team.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        league_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'league',
                key: 'id'
            }
        },
        logo: {
            type: DataTypes.BLOB,

        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        hooks: {},
        sequelize,
        modelName: 'team',
    }
);

module.exports = Team;