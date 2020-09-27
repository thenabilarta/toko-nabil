const mongoose = require('mongoose');

const uploadProductSchema = mongoose.Schema({
  gambarURL: {
    type: String,
  },
  namaProduk: {
    type: String,
  },
});

const UploadProduct = mongoose.model('UploadProduct', uploadProductSchema);

module.exports = {UploadProduct};
