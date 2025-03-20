const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactUs = new Schema({
    LANGUAGE: String,
    TITLE: String,
    DESCRIPTION: String,
    
});

module.exports = mongoose.model('ContactUs', ContactUs);