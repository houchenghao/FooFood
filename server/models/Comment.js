const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const commentSchema = new Schema({
    
    commentText: {
        type: String,
        required: true,
        minlength:1,
        maxlength:500,
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

    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});


const Comment = model('Comment', commentSchema);

module.exports = Comment;