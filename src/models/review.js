const mongoose = require('mongoose');
const {Schema} = mongoose;

const Review = new Schema({
    LANGUAGE: String,
    IMG_URL_1: String,
    IMG_URL_2: String,
    IMG_URL_3: String,
    COUPLE_NAMES: String,
    EVENT_DATE: String,
    VIDEO_LINK: String,
    CODE : String,
    DESCRIPTION: [String],
});

module.exports = mongoose.model('Review', Review);