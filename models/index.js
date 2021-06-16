const User = require('./user');
const League = require('./League');
const Team = require('./Team');
const Game = require('./Game');
const UserFollowing = require('./UserFollowing');
const TeamRecord = require('./TeamRecord');

User.belongsToMany(Team, { through: UserFollowing, foreignKey: 'userId' });
Team.belongsToMany(User, { through: UserFollowing, foreignKey: 'teamId' });
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
