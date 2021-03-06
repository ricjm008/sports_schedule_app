// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const { Op } = require("sequelize");
const { Team, Game, TeamRecord, UserFollowing } = require("../../models");
const gravatar = require("gravatar");

// Requiring our custom middleware for checking if a user is logged in
const withAuth = require("../../utils/withAuth");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
      const pastGamesData = await Game.findAll({
        include: [{ all: true, nested: true }],
        order: [["date_time", "ASC"]],
        where: {
          date_time: {
            [Op.lt]: new Date(),
          },
        },
      });
      const upcomingGamesData = await Game.findAll({
        include: [{ all: true, nested: true }],
        order: [["date_time", "ASC"]],
        where: {
          date_time: {
            [Op.gte]: new Date(),
          },
        },
      });
      const pastGames = pastGamesData.map((g) => g.get({ plain: true }));
      const upcomingGames = upcomingGamesData.map((g) => g.get({ plain: true }));
      // const pastGames = games.map((g) => g.date_time >= req.session.currentTime);
      res.render("index", {
        loggedIn: req.session.loggedIn,
        pastGames,
        upcomingGames,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/login", (req, res) => {
  // If the user already has an account send them to the dashboard page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204);
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the dashboard page
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("signup", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/dashboard", withAuth, async (req, res) => {
  const url = gravatar.url(req.session.user.email, {
    s: "80",
    r: "pg",
    d: "404",
  });
  try {
    const userFollowingData = await UserFollowing.findAll({
      where: {userId: req.session.user.id},
      include: [{ all: true, nested: true }],
    });
    const userFollowingTeams = userFollowingData.map((g) => g.get({ plain: true }));
    const pastGamesData = await Game.findAll({
      include: [{ all: true, nested: true }],
      order: [["date_time", "ASC"]],
      where: {
        //teams: { id: userFollowingTeams.teamId },
        date_time: {
          [Op.lt]: new Date(),
        },
      },
    });
    const upcomingGamesData = await Game.findAll({
      include: [{ all: true, nested: true }],
      order: [["date_time", "ASC"]],
      where: {
        date_time: {
          [Op.gte]: new Date(),
        },
      },
    });
    const pastGames = pastGamesData.map((g) => g.get({ plain: true }));
    const filteredPastGames = pastGames.filter((game) =>
      game.teams.some((t) => t.id === 2 || t.id === 3)//userFollowingTeams.teams[0].id)
    );
    const upcomingGames = upcomingGamesData.map((g) => g.get({ plain: true }));
    const filteredUpcomingGames = upcomingGames.filter((game) =>
      game.teams.some((t) => t.id === 2 || t.id === 3)//userFollowingTeams.teams[0].id)
    );
    console.log(userFollowingTeams, filteredPastGames, filteredUpcomingGames);
    res.render("dashboard", {
      user: req.session.user,
      userAvatar: url,
      loggedIn: req.session.loggedIn,
      filteredPastGames,
      filteredUpcomingGames,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/schedule", async (req, res) => {
  try {
    const gamesData = await Game.findAll({
      include: [{ all: true, nested: true }],
    });
    const games = gamesData.map((g) => g.get({ plain: true }));
    res.render("schedule", {
      user: req.session.user,
      loggedIn: req.session.loggedIn,
      games,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/team/:id", async (req, res) => {
  let isFollow = false;
  let isntFollow = true;

  console.log({loggedIN: req.session.loggedIn});
  if (req.session.loggedIn) {
    const following = await UserFollowing.findAll({
      where: {
        userId: req.session.user.id,
        teamId: req.params.id
      }
    });
    isFollow = following
    isntFollow = !following

  }

  console.log({isFollow});

  try {
    // Search the database for a dish with an id that matches params
    const teamData = await Team.findByPk(req.params.id);
    const teamGamesData = await Game.findAll({
      include: [{ all: true, nested: true }],
    });

    const teamGames = teamGamesData.map((g) => g.get({ plain: true }));
    const team = teamData.get({ plain: true });

    const filteredTeamGames = teamGames.filter((game) =>
      game.teams.some((t) => t.id === team.id)
    );

    res.render("teampage", {
      user: req.session.user,
      loggedIn: req.session.loggedIn,
      team,
      isFollow,
      isntFollow,
      teamGames: filteredTeamGames,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
