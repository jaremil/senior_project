const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

const User = mongoose.model('User', { displayName: String, googleId: String, email: String })
const Recipe = mongoose.model('Recipe', { recipeName: String, displayName: String,  });

const express = require('express');
const commentsRouter = express.Router();
const {
  getAll,
  getSingle,
  create,
  update,
  remove
} = require('./comments.js');


commentsRouter.get('/', getAll);
commentsRouter.get('/:id', getSingle);
commentsRouter.post('/', create);
commentsRouter.put('/:id', update);
commentsRouter.delete('/:id', remove);

module.exports = {
  commentsRouter,
  User,
  Recipe
};