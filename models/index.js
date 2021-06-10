const User = require('./user');
const League = require('./League');
const Team = require('./Team');
const Game = require('./Game');
const Schedule = require('./Schedule');
const UserFollowing = require('./UserFollowing');
const TeamRecord = require('./TeamRecord');

User.belongsToMany(Team, { through: UserFollowing, foreignKey: 'userId' });
Team.belongsToMany(User, { through: UserFollowing, foreignKey: 'teamId' });
Team.belongsToMany(Game, { through: TeamRecord, foreignKey: 'teamId' });
Game.belongsToMany(Team, { through: TeamRecord,  foreignKey: 'gameId' });
Team.belongsTo(League);
League.hasMany(Team);
Game.belongsTo(Schedule);
Schedule.hasMany(Game);

module.exports = {
    User,
    Game,
    League,
    Schedule,
    Team,
    UserFollowing,
    TeamRecord
};
