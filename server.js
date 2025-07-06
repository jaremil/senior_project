if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const passport = require('passport');
const session = require('express-session');
// const mongoose = require('mongoose');
const express = require('express');
require('./config/google_auth.js');

const app = express();

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

const projectsRouter = require('./routes/project')
app.use('/', projectsRouter);

app.listen(process.env.PORT || 3000);

console.log('hosted on http://localhost:3000')