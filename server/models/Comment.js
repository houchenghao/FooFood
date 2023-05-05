const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength:1,
        maxlength:500,
    },

    commentAuthor: {
        type: String,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }

});


const Comment = model('Comment', commentSchema);

module.exports = Comment;