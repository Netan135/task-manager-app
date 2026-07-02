const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new task
router.post('/', auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const task = new Task({
            title,
            description,
            user: req.user._id
        });
        
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;