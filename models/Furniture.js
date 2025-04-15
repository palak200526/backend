const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    category: String,
    imageUrl: String
});

module.exports = mongoose.model('Furniture', furnitureSchema);
