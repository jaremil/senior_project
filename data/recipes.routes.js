const express = require('express');
const recipesRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const {
  getAll,
  create,
  update,
  remove,
} = require('./recipes');

recipesRouter.get('/', isAuthenticated, getAll);
recipesRouter.post('/', isAuthenticated, create);
recipesRouter.put('/:id', isAuthenticated, update);
recipesRouter.delete('/:id', isAuthenticated, remove);

module.exports = recipesRouter;