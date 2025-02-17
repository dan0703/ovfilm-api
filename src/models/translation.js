const mongoose = require('mongoose');
const path = require('path');
const VideoGallery = require(path.join(__dirname, 'videoGallery.js'));
const Review = require(path.join(__dirname, 'review.js'));
const PhotoGallery = require(path.join(__dirname, 'photoGallery.js'));
const ContactUs = require(path.join(__dirname, 'contactUs.js'));
const AboutUs = require(path.join(__dirname, 'aboutUs.js'));

const Translation = new mongoose.Schema({
    language: { type: String, required: true, unique: true }, 
    sections: {
        type: {
            VIDEO_GALLERY: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoGallery', required: false },
            REVIEW: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: false }],
            ABOUT_US: { type: mongoose.Schema.Types.ObjectId, ref: 'AboutUs', required: false },
            PHOTO_GALLERY: { type: mongoose.Schema.Types.ObjectId, ref: 'PhotoGallery', required: false },
            CONTACT_US: { type: mongoose.Schema.Types.ObjectId, ref: 'ContactUs', required: false }
        },
        required: true
    }
});

module.exports = mongoose.model('Translation', Translation);
