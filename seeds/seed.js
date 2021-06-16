const sequelize = require("../config/connection");
const {
  User,
  League,
  Team,
  Game,
  Schedule,
  UserFollowing,
  TeamRecord,
} = require("../models");

const userData = require("./userData.json");
const { leagueData, teamData } = require("./teams-seeds");
const { gameData } = require("./games-seeds");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const leagues = await League.bulkCreate(leagueData, {
    individualHooks: true,
    returning: true,
  });
  const teams = await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  });
  const games = await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // for (const team of teamData) {
  //     await Team.create({
  //         ...team,
  //         id: teams[Math.floor(Math.random() * teams.length)].id,
  //     });
  // }

  process.exit(0);
};

seedDatabase();
