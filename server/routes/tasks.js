const express = require('express');
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/board/:boardId', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId, isArchived: false })
      .populate('assignees', 'name email avatar')
      .populate('comments.user', 'name avatar')
      .sort({ order: 1 });
    res.json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, board, columnId, priority, dueDate, assignees, labels } = req.body;
    const taskCount = await Task.countDocuments({ board, columnId });
    const task = new Task({ title, description, board, columnId, priority, dueDate, assignees, labels, order: taskCount });
    await task.save();
    const populated = await task.populate('assignees', 'name email avatar');
    res.status(201).json(populated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignees', 'name email avatar');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.comments.push({ user: req.userId, text: req.body.text });
    await task.save();
    const populated = await task.populate('comments.user', 'name avatar');
    res.json(populated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { isArchived: true });
    res.json({ message: 'Task archived' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/reorder/batch', authenticate, async (req, res) => {
  try {
    const { tasks } = req.body;
    const operations = tasks.map(t => ({
      updateOne: { filter: { _id: t.id }, update: { columnId: t.columnId, order: t.order } }
    }));
    await Task.bulkWrite(operations);
    res.json({ message: 'Tasks reordered' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
