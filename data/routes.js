const passport = require('passport');

const { User, Recipe } = require("./connection");

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("peachletpages.onrender.com/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('peachletpages.onrender.com/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/start');
  });

// PROFILE
routes.get('peachletpages.onrender.com/start', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  //where it goes after they log in
  res.redirect('./start.html');
});

//LOG OUT
routes.get('peachletpages.onrender.com/logout.html', (req, res) => {
  req.logout(() => {
    res.redirect('./logout.html');
  });
});

const path = require('path');

routes.get("peachletpages.onrender.com/start.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'start.html'));
});

module.exports = routes;