const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const recipeSchema = new Schema({
    recipeName:{
        type: String,
        required: true,
    },

    recipeDescription: {
        type: String,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },

    updated_at: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    imageLink: {
        type: String,
    },

});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
