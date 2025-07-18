const express = require('express');
const commentsRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const {
  create,
  remove,
} = require('./users');

commentsRouter.post('/', isAuthenticated, create);
commentsRouter.delete('/:id', isAuthenticated, remove);

module.exports = commentsRouter;