const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Furniture = require('../models/Furniture');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all furniture
router.get('/', async (req, res) => {
  const items = await Furniture.find();
  res.json(items);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const item = await Furniture.findOne({ id: req.params.id });
  item ? res.json(item) : res.status(404).json({ error: 'Item not found' });
});

// POST new furniture
router.post('/', upload.single('image'), async (req, res) => {
  const { id, name, price, category } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  const newItem = new Furniture({ id, name, price, category, imageUrl });
  await newItem.save();
  res.status(201).json(newItem);
});

// PUT (Update)
router.put('/:id', upload.single('image'), async (req, res) => {
  const updates = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  if (req.file) updates.imageUrl = `/uploads/${req.file.filename}`;

  const updated = await Furniture.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
  updated ? res.json(updated) : res.status(404).json({ error: 'Item not found' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Furniture.findOneAndDelete({ id: req.params.id });
  deleted ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
});

module.exports = router;
