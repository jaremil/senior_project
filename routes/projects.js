const passport = require('passport');

const { User, Recipe } = require("../models/project");

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/senior_project/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('/senior_project/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/start');
  });

// PROFILE
routes.get('/senior_project/start', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  //where it goes after they log in
  res.redirect('./start.html');
});

//LOG OUT
routes.get('/logout.html', (req, res) => {
  req.logout(() => {
    res.redirect('./logout.html');
  });
});


const path = require('path');

routes.get("/senior_project/start.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'start.html'));
});

module.exports = routes;