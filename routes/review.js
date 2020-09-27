const express = require('express');
const router = express.Router();
const {Review} = require('../models/review');
const {auth} = require('../middleware/auth');

router.post('/savereview', auth, async (req, res) => {
  const review = new Review(req.body);

  const newReview = await review.save();
  if (newReview) {
    res.send('berhasil gan');
  } else {
    res.status(401).send({message: 'Invalid User Data.'});
  }
});

router.post('/getreviews', async (req, res) => {
  const response = await Review.find({productId: req.body.id}).populate(
    'writer'
  );
  res.send(response);
});

module.exports = router;
