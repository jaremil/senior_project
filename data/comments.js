const { client } = require('./connection');
const { ObjectId } = require('mongodb');

app.get('/comments', (req, res) => {
  res.sendFile(__dirname + './social.html');
});

// Function to get all comments
 
const getAll = async (req, res) => {
  try {
    // Query the comments collection in peachletpage and convert results to an array
    const comments = await client
      .db('peachletpage')
      .collection('comments')
      .find()
      .toArray();
    res.json({ comments });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Function to create comment
 
const create = async (req, res) => {
  // Validate required fields
  if (
    !req.body.userId ||
    !req.body.recipeId ||
    !req.body.commentComment
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, commentComment)',
    });
  }

  // Validate ObjectIds
  if (
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body.recipeId)
  ) {
    return res.status(400).json({ error: 'Invalid user or recipe ID' });
  }

  // Creating newComment object
  const newComment = {
    userId: new ObjectId(req.body.userId),
    recipeId: new ObjectId(req.body.recipeId),
    commentComment: req.body.commentComment,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  // Inserting into database
  const result = await client
    .db('peachletpage')
    .collection('comments')
    .insertOne(newComment);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Function to update comment
 
const update = async (req, res) => {
  // Validate required fields
  if (
    !req.body.userId ||
    !req.body.recipeId ||
    !req.body.commentComment 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, commentComment)',
    });
  }

  // Creating updatedComment object
  const updatedComment = {
    userId: new ObjectId(req.body.userId),
    recipeId: new ObjectId(req.body.recipeId),
    commentComment: req.body.commentComment,
    updatedDate: new Date()
  };

  // Storing it into database
  const result = await client
    .db('peachletpage')
    .collection('comments')
    .updateOne({ _id: new ObjectId(commentId) }, { $set: updatedComment });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
};

// Function to delete comment
 
const remove = async (req, res) => {
  // Getting commentId from URL
  const commentId = req.params.id;

  if (!ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete comment from database
  const result = await client
    .db('peachletpage')
    .collection('comments')
    .deleteOne({ _id: new ObjectId(commentId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
};

module.exports = { getAll, create, update, remove };