if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const passport = require('passport');
const session = require('express-session');
// const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
var app = express();
require('./data/google_auth.js');

// Serve the "styles" folder as static
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static('public'));
app.use(express.static('styles'));

const projectsRouter = require('./data/routes.js')
app.use('/', projectsRouter);
