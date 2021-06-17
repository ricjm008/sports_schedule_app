const User = require('./user');
const League = require('./League');
const Team = require('./Team');
const Game = require('./Game');
const UserFollowing = require('./UserFollowing');
const TeamRecord = require('./TeamRecord');

Team.belongsToMany(Game, { through: TeamRecord, foreignKey: 'teamId', uniqueKey: false });
Game.belongsToMany(Team, { through: TeamRecord, foreignKey: 'gameId', uniqueKey: false });
Team.belongsTo(League);
League.hasMany(Team);
Game.belongsTo(League);
League.hasMany(Game);

module.exports = {
    User,
    Game,
    League,
    Team,
    UserFollowing,
    TeamRecord
};
