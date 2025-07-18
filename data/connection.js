const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

const User = mongoose.model('User', { displayName: String, googleId: String, email: String });
const Recipe = mongoose.model('Recipe', { recipeName: String, userId: Object, ingredients: Array, instructions: Array });
const Comments = mongoose.model('Comments', { general: Boolean, public: Boolean });
const Ingredient = mongoose.model('Ingredient', { ingredientName: String, groceryList: String,
inventoryList: String });

module.exports = { User, Recipe, Comments, Ingredient }