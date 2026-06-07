const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/project/:projectId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate("assignee creator", "name email avatar").sort({ order: 1 });
    res.json(tasks);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const count = await Task.countDocuments({ project: req.body.project, column: req.body.column || "todo" });
    const task = new Task({ ...req.body, creator: req.user._id, order: count });
    await task.save();
    res.status(201).json(task);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.patch("/:id/move", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(task);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, creator: req.user._id });
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

module.exports = router;
