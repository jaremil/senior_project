const fs = require('fs');

const rawData = fs.readFileSync('../data/recipes.json', 'r');
const recipeData = JSON.parse(rawData);

console.log(recipeData);