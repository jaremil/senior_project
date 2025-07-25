const express = require('express');
const commentsRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const {
  getAll,
  create,
  remove,
} = require('./comments');

commentsRouter.get('/', isAuthenticated, getAll);
commentsRouter.post('/', isAuthenticated, create);
commentsRouter.delete('/:id', isAuthenticated, remove);

module.exports = commentsRouter;