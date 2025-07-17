const express = require('express');
const recipesRouter = express.Router();
const {
  getAll,
//   create,
//   update,
//   remove,
} = require('./recipes');

recipesRouter.get('/', getAll);
// recipesRouter.post('/', create);
// recipesRouter.put('/:id', update);
// recipesRouter.delete('/:id', remove);

module.exports = recipesRouter;