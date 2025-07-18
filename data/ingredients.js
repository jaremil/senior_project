const { client } = require('./connection');
const { ObjectId } = require('mongodb');

app.get('/ingredients', (req, res) => {
  res.sendFile(__dirname + './social.html');
});

// Function to get all ingredients
 
const getAll = async (req, res) => {
  try {
    // Query the ingredients collection in peachletpage and convert results to an array
    const ingredients = await client
      .db('peachletpage')
      .collection('ingredients')
      .find()
      .toArray();
    res.json({ ingredients });
  } catch {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Function to create ingredient
 
const create = async (req, res) => {
  // Validate required fields
  if (
    !req.body.general ||
    !req.body.public
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (general, public)',
    });
  }

  // Validate ObjectIds
  if (
    !String.isValid(req.body.public)
  ) {
    return res.status(400).json({ error: 'Invalid user or recipe ID' });
  }

  // Creating newIngredient object
  const newIngredient = {
    general: new String(req.body.general),
    public: new String(req.body.public),
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  // Inserting into database
  const result = await client
    .db('peachletpage')
    .collection('ingredients')
    .insertOne(newIngredient);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
};

// Function to update ingredient
 
const update = async (req, res) => {
  // Validate required fields
  if (
    !req.body.general ||
    !req.body.public 
  ) {
    return res.status(400).json({
      error:
        'All fields are required: (general, public)',
    });
  }

  // Creating updatedIngredient object
  const updatedIngredient = {
    general: new String(req.body.general),
    public: new String(req.body.public),
    updatedDate: new Date()
  };

  // Storing it into database
  const result = await client
    .db('peachletpage')
    .collection('ingredients')
    .updateOne({ _id: new ObjectId(ingredientId) }, { $set: updatedIngredient });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
};

// Function to delete ingredient
 
const remove = async (req, res) => {
  // Getting ingredientId from URL
  const ingredientId = req.params.id;

  if (!ObjectId.isValid(ingredientId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete ingredient from database
  const result = await client
    .db('peachletpage')
    .collection('ingredients')
    .deleteOne({ _id: new ObjectId(ingredientId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Ingredient not found' });
  }
};

module.exports = { getAll, create, update, remove };