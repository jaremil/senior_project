const { client } = require('connection');
const { ObjectId } = require('mongodb');

// get all reviews

const getAll = async (req, res) => {
  try {
    const reviews = await client
      .db('recipeReviewDB')
      .collection('reviews.js')
      .find()
      .toArray();
    res.json({ reviews });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

// get review by id

const getSingle = async (req, res) => {

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const review = await client
    .db('recipeReviewDB')
    .collection('reviews')
    .findOne({ _id: new ObjectId(id) });

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }
  res.json(review);
};

// create review

const create = async (req, res) => {

  if (
    !req.body.userId ||
    !req.body.recipeId ||
    !req.body.commentReview 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, commentReview)',
    });
  }

  if (
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body. recipeId)
  ) {
    return res.status(400).json({ error: 'Invalid user or ID' });
  }

  const newReview = {
    userId: new ObjectId(req.body.userId),
    recipeId: new ObjectId(req.body. recipeId),
    commentReview: req.body.commentReview,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const result = await client
    .db('recipeReviewDB')
    .collection('reviews')
    .insertOne(newReview);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// update review

const update = async (req, res) => {
  if (
    !req.body.userId ||
    !req.body. recipeId ||
    !req.body.commentReview 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (userId, recipeId, commentReview)',
    });
  }

  const reviewId = req.params.id;

  if (
    !ObjectId.isValid(reviewId) ||
    !ObjectId.isValid(req.body.userId) ||
    !ObjectId.isValid(req.body. recipeId)
  ) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const updatedReview = {
    userId: new ObjectId(req.body.userId),
     recipeId: new ObjectId(req.body. recipeId),
    commentReview: req.body.commentReview,
    updatedDate: new Date(),
  };
  const result = await client
    .db('recipeReviewDB')
    .collection('reviews')
    .updateOne({ _id: new ObjectId(reviewId) }, { $set: updatedReview });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
};

// delete review 

const remove = async (req, res) => {

  const reviewId = req.params.id;

  if (!ObjectId.isValid(reviewId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const result = await client
    .db('recipeReviewDB')
    .collection('reviews')
    .deleteOne({ _id: new ObjectId(reviewId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
};

module.exports = { getAll, getSingle, create, update, remove };