const mongoose = require('mongoose');
const {Schema} = mongoose;

const VideoGallery = new Schema({
    LANGUAGE: String,
    IMG_URL_1: String, 
    TITLE: String,
    DESCRIPTION: [String],
});

module.exports = mongoose.model('VideoGallery', VideoGallery);