const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const {UploadProduct} = require('../models/product');
const {FullProduct} = require('../models/fullProduct');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({storage}).single('image');

router.post('/upload', upload, (req, res) => {
  let myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  // console.log(req.file);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}.${fileType}`,
    Body: req.file.buffer,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }

    res.send(data);
    const variable = {
      gambarURL: `https://toko-nabil.s3-ap-southeast-1.amazonaws.com/${params.Key}`,
    };
    const uploadProduct = new UploadProduct(variable);
    uploadProduct.save();
  });
});

router.post('/fullproduct', async (req, res) => {
  const fullProduct = new FullProduct(req.body);

  const newFullProduct = await fullProduct.save();
  if (newFullProduct) {
    res.send('berhasil gan');
  } else {
    res.status(401).send({message: 'Invalid User Data.'});
  }
});

router.get('/getproducts', async (req, res) => {
  const response = await FullProduct.find().populate('writer');
  res.send(response);
});

router.post('/getproductdetails', async (req, res) => {
  const response = await FullProduct.find({_id: req.body.id}).populate(
    'writer'
  );
  res.send(response);
});

module.exports = router;
