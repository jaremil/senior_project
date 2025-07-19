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

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});

const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
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

// const { commentsRouter } = require('./data/connection.js'); 
// app.use('/comments', commentsRouter);


const multer = require("multer");
const cors = require("cors");

const port = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });

app.use(cors());

app.use(express.static("public"));

app.post("/upload", upload.single("image"), (req, res) => {
    const filePath = req.file.path;

    res.json({ message: "Image uploaded", path: filePath });
});

app.listen(port, () => console.log(`Server running on port ${port}`));