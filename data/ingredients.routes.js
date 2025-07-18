const express = require('express');
const ingredientsRouter = express.Router();
const isAuthenticated = require('./middlewareAuth');
const {
  getAll,
  create,
  update,
  remove,
} = require('./ingredients');

ingredientsRouter.get('/', isAuthenticated, getAll);
ingredientsRouter.post('/', isAuthenticated, create);
ingredientsRouter.put('/:id', isAuthenticated, update);
ingredientsRouter.delete('/:id', isAuthenticated, remove);

module.exports = ingredientsRouter;