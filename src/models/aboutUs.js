const mongoose = require('mongoose');
const {Schema} = mongoose;

const AboutUs = new Schema({
    LANGUAGE: String,
    IMG_URL_1: String,
    IMG_URL_2: String,
    IMG_URL_3: String,
    HEADER: String,
    TITLE: String,
    DESCRIPTION: String,
});

module.exports = mongoose.model('AboutUs', AboutUs);