const express = require('express');
const commentsRouter = express.Router();
const {
  getAll,
  create,
  update,
  remove,
} = require('./comments');

commentsRouter.get('/', getAll);
commentsRouter.post('/', create);
commentsRouter.put('/:id', update);
commentsRouter.delete('/:id', remove);

module.exports = commentsRouter;