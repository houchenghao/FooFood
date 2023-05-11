const { Schema, model } = require('mongoose');

const imgSchema = new Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const Image = model('Image', imgSchema);

module.exports = Image;