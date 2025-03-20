const mongoose = require('mongoose');
const {Schema} = mongoose;

const Article = new Schema({
    LANGUAGE: String,
    subtitle1: String,
    content1: String,
    content2: String,
    subtitle2: String,
    content3: String,
    imgUrl2: String,
    imgUrl3: String,
    id: Number,
    title: String,
    description: String,
    date: String,
    imgUrl: String,
});

module.exports = mongoose.model('Article', Article);