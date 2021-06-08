const User = require('./user');
const Game = require('./Game');
const League = require('./League');
const Schedule = require('./Schedule');
const Team = require('./Team');
const Score = require('./Score');
const UserFollowing = require('./UserFollowing');
const TeamRecord = require('./TeamRecord');
User.belongsToMany(Team, { through: { model: UserFollowing, unique: false }});
Team.belongsToMany(User, { through: { model: UserFollowing, unique: false }});
Team.belongsTo(League, { foreignKey: 'league_id' });
Score.belongsTo(Game, { foreignKey: 'game_id' });
Team.belongsToMany(Game, { through: {model: TeamRecord, unique: false }});
Game.belongsToMany(Team, { through: {model: TeamRecord, unique: false }});
module.exports = {
    User,
    Game,
    League,
    Schedule,
    Team
};
