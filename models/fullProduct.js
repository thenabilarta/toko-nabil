const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fullProductSchema = mongoose.Schema({
  namaProduk: {type: String},
  hargaProduk: {type: String},
  urlProduk: {type: String},
  merkProduk: {type: String},
  kategoriProduk: {type: String},
  deskripsiProduk: {type: String},
  date: {type: String},
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const FullProduct = mongoose.model('FullProduct', fullProductSchema);

module.exports = {FullProduct};
