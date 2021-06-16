// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const { Op } = require("sequelize");
const { Team, Game, TeamRecord } = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require("../../utils/withAuth");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
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
router.get("/dashboard", withAuth, (req, res) => {
  console.log(req.session.user);
  //   const teams = await Team.find({
  //     where: {},
  //   });
  res.render("dashboard", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
    upcomingGames: [
      {
        homeTeam: "Crows",
        awayTeam: "Power",
      },
      {
        homeTeam: "Hawthorn",
        awayTeam: "Brisbane",
      },
    ],
    pastGames: [
      {
        homeTeam: "Crows",
        awayTeam: "Power",
      },
      {
        homeTeam: "Hawthorn",
        awayTeam: "Brisbane",
      },
    ],
  });
});

router.get("/team", (req, res) => {
  res.render("teampage", {
    user: req.session.user,
    loggedIn: req.session.loggedIn,
  });
});

router.get('/schedule', async (req, res) => {
  try {
    const gamesData = await Game.findAll({
      include: [{ all: true, nested: true }]
    });
    const games = gamesData.get({ plain: true });
    res.render('schedule', {
        user: req.session.user,
        loggedIn: req.session.loggedIn,
        games
    });
  } catch (err) {
    res.status(500).json(err);
}
});

router.get('/team/:id', async (req, res) => {
    try {
      // Search the database for a dish with an id that matches params
      const teamData = await Team.findByPk(req.params.id);
      const teamGamesData = await Game.findAll({
        include: [{ all: true, nested: true }]
      });
  
      const teamGames = teamGamesData.map((g) => g.get({plain: true}))
      const team = teamData.get({ plain: true });
  
      const filteredTeamGames = teamGames.filter(game => game.teams.some(t => t.id === team.id));
  
  
        res.render('teampage', {
          user: req.session.user,
          loggedIn: req.session.loggedIn,
          team,
          teamGames: filteredTeamGames
      });
    } catch (err) {
        res.status(500).json(err);
    }
  });



module.exports = router;
