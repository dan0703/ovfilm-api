const mongoose = require('mongoose');
const {Schema} = mongoose;
const path = require('path');
const Image = require(path.join(__dirname, 'image.js'));


const PhotoGallery = new Schema({
    LANGUAGE: String,
    IMG_URLS: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }], 
    IMG_URL_1: String, 
    TITLE: String,
    DESCRIPTION: String,
});

module.exports = mongoose.model('PhotoGallery', PhotoGallery);