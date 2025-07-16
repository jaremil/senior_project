const { client } = require('./connection');
const { ObjectId } = require('mongodb');

// get all comments

const getAll = async (req, res) => {
  try {
    const comments = await client
      .db('peachletpages')
      .collection('comments')
      .find()
      .toArray();
    res.json({ comments });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

// get comment by id

const getSingle = async (req, res) => {

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const comment = await client
    .db('peachletpages')
    .collection('comments')
    .findOne({ _id: new ObjectId(id) });

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(comment);
};

// create comment

const create = async (req, res) => {

  if (
    !req.body.userId ||
    !req.body.recipeId ||
    !req.body.comment 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, comment)',
    });
  }

  if (
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body. recipeId)
  ) {
    return res.status(400).json({ error: 'Invalid user or ID' });
  }

  const newComment = {
    userId: new ObjectId(req.body.userId),
    recipeId: new ObjectId(req.body. recipeId),
    comment: req.body.comment,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const result = await client
    .db('peachletpages')
    .collection('comments')
    .insertOne(newComment);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// update comment

const update = async (req, res) => {
  if (
    !req.body.userId ||
    !req.body. recipeId ||
    !req.body.comment 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, comment)',
    });
  }

  const commentId = req.params.id;

  if (
    !ObjectId.isValid(commentId) ||
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body. recipeId)
  ) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const updatedComment = {
    userId: new ObjectId(req.body.userId),
     recipeId: new ObjectId(req.body. recipeId),
    comment: req.body.comment,
    updatedDate: new Date(),
  };
  const result = await client
    .db('peachletpages')
    .collection('comments')
    .updateOne({ _id: new ObjectId(commentId) }, { $set: updatedComment });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
};

// delete comment 

const remove = async (req, res) => {

  const commentId = req.params.id;

  if (!ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const result = await client
    .db('peachletpages')
    .collection('comments')
    .deleteOne({ _id: new ObjectId(commentId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove
};