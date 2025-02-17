const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactUs = new Schema({
    LANGUAGE: String,
    TITLE: String,
    DESCRIPTION: [String],
    NAME: String,
    PH_FIRST_NAME: String,
    PH_LAST_NAME: String,
    EMAIL: String,
    PHONE_NUMBER: String,
    EVENT_DATE: String,
    LOCATION: String,
    HOW_ENGAGED: String,
    PH_HOW_ENGAGED: String,
});

module.exports = mongoose.model('ContactUs', ContactUs);