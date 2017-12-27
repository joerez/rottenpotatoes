const mongoose = require('mongoose');
const Schema = mongoose.Schema


const reviewSchema = mongoose.Schema({
  title: String,
  description: String,
  movieTitle: String,
  rating: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
