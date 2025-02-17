const mongoose = require('mongoose');
const {Schema} = mongoose;

const Image = new Schema({
    IMAGE_LINK: String,
    IMAGE_NAME: String,
});
module.exports = mongoose.model('Image', Image);