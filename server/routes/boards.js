const express = require('express');
const Board = require('../models/Board');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const boards = await Board.find({
      $or: [{ owner: req.userId }, { members: req.userId }],
      isArchived: false
    }).populate('owner', 'name email avatar').populate('members', 'name email avatar');
    res.json(boards);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, background } = req.body;
    const board = new Board({
      title, description, background,
      owner: req.userId,
      members: [req.userId],
      columns: [
        { id: 'todo', title: 'To Do', order: 0 },
        { id: 'in-progress', title: 'In Progress', order: 1 },
        { id: 'review', title: 'Review', order: 2 },
        { id: 'done', title: 'Done', order: 3 }
      ]
    });
    await board.save();
    res.status(201).json(board);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar');
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId }, req.body, { new: true }
    );
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/members', authenticate, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    if (!board.members.includes(req.body.userId)) {
      board.members.push(req.body.userId);
      await board.save();
    }
    res.json(board);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
