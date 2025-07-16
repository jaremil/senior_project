const passport = require('passport');

const path = require('path');

const { User, Recipe } = require("./connection");

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/start');
});

// PROFILE
routes.get('/start', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  //where it goes after they log in
  res.redirect('./start.html');
});

//LOG OUT
routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

routes.get("/start.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'start.html'));
});

// PAGES

routes.get("/profile.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'profile.html'));
});

routes.get("/scan.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'scan.html'));
});

routes.get("/social.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'social.html'));
});

// comments



module.exports = routes;