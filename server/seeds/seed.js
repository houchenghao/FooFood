const db = require('../config/connection');
const { User, Recipe, Comment } = require('../models')

const commentData = require('./commentSeeds.json');
const recipeData = require('./recipeSeeds.json');
const userData = require('./userSeeds.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
    await Comment.deleteMany({});

    const users = await User.insertMany(userData);
    const recipes = await Recipe.insertMany(recipeData);
    const comments = await Comment.insertMany(commentData);


    for (let i = 0; i < users.length; i++) {
        users[i].recipes.push(recipes[i]);
        await users[i].save();
    }


    for (let i = 0; i< recipes.length; i++){
        recipes[i].comments.push(comments[i]);
        await recipes[i].save();
    }
    



    console.log('all done!');
    process.exit(0);


})