require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS


const furnitureRoutes = require('./routes/furniture');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');



const app = express();
const port = process.env.PORT || 3000;

// ✅ Enable CORS for all origins
app.use(cors());
app.use(express.json({ limit: '10mb' })); // add a limit if your requests are large
app.use('/uploads', express.static('uploads'));



// Middleware
app.use(express.json());

// Routes
app.use('/furniture', furnitureRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});