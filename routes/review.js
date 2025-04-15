const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST: Add a review
router.post('/', async (req, res) => {
  const { name, text, photo } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'Name and review text required' });

  try {
    const review = new Review({ name, text, photo });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET: Fetch all reviews (optional)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;