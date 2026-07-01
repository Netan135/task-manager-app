const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANT: Your routes - make sure the paths are correct
const userRoutes = require('./backend/routes/userRoutes');
const taskRoutes = require('./backend/routes/taskRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});

// Test route for POST
app.post('/test', (req, res) => {
    res.json({ message: 'POST request works!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});