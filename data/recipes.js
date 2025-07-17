const { client } = require('./connection');
const { ObjectId } = require('mongodb');

app.get('/recipes', (req, res) => {
    res.sendFile(__dirname + './social.html');
});

/* Function to get all recipes */

const getAll = async (req, res) => {
    try {
        // Query the recipes collection in peachletpage and convert results to an array
        const recipes = await client
            .db('peachletpage')
            .collection('recipes')
            .find()
            .toArray();
        res.json({ recipes });
    } catch {
        res.status(500).json({ error: 'Server Error' });
    }
};


/* Function to create  recipe */

const create = async (req, res) => {
    // Validate required fields
    if (
        !req.body.recipeName ||
        !req.body.ingredients ||
        !req.body.directions
    ) {
        return res.status(400).json({
            error:
                'All fields are required: (recipeName, ingredients, directions)',
        });
    }

    // Validate ObjectIds
    if (
        !ObjectId.isValid(req.body.recipeName) ||
        !ObjectId.isValid(req.body.directions)
    ) {
        return res.status(400).json({ error: 'Invalid user or recipe ID' });
    }



    // Creating newRecipe object
    const newRecipe = {
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        createdDate: new Date(),
        updatedDate: new Date(),
    };

    // Inserting into database
    const result = await client
        .db('peachletpage')
        .collection('recipes')
        .insertOne(newRecipe);
    if (result.acknowledged) {
        res.status(201).json({ id: result.insertedId });
    } else {
        res.status(500).json({ error: 'Failed to create  recipe' });
    }
};

/* Function to update  recipe */

const update = async (req, res) => {
    // Validate required fields
    if (
        !req.body.recipeName ||
        !req.body.ingredients ||
        !req.body.directions
    ) {
        return res.status(400).json({
            error:
                'All fields are required: (recipeName, ingredients, directions)',
        });
    }

    // Creating updatedRecipe object
    const updatedRecipe = {
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        updatedDate: new Date()
    };

    // Storing into database
    const result = await client
        .db('peachletpage')
        .collection('recipes')
        .updateOne({ _id: new ObjectId(ingredients) }, { $set: updatedRecipe });
    if (result.matchedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Recipe not found' });
    }
};