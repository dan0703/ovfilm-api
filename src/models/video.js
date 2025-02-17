const mongoose = require('mongoose');
const {Schema} = mongoose;

const Video = new Schema({
    VIDEO_LINK: String,
    THUMBNAIL_LINK: String,
});
module.exports = mongoose.model('Video', Video);