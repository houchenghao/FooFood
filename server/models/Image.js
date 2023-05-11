const { Schema, model } = require('mongoose');

const imgSchema = new Schema({
    // name: String,

    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    
    img: {
        data: Buffer,
        contentType: String
    }
});

const Image = model('Image', imgSchema);

module.exports = Image;