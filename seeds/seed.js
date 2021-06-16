const sequelize = require('../config/connection');
const { User, League, Team, Game, UserFollowing, TeamRecord } = require('../models');

const userData = require('./userData.json');
const { leagueData, teamData } = require('./teams-seeds');
const { gameData } = require('./games-seeds');
const { teamRecordData } = require('./team-record-seeds');
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);

    await League.bulkCreate(leagueData, {
        individualHooks: true,
        returning: true,
    });

    await Team.bulkCreate(teamData, {
        individualHooks: true,
        returning: true,
    });

    await Game.bulkCreate(gameData);
    await TeamRecord.bulkCreate(teamRecordData);


    process.exit(0);
};

seedDatabase();
