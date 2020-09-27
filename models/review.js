const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  content: {type: String},
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: String,
  },
  date: {type: String},
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};
