const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Register a new user
router.post('/', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });  // password must be included here
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error("User creation error:", err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log(`Login attempt: ${email}`);

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updated ? res.json(updated) : res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        deleted ? res.json({ message: 'User deleted' }) : res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
