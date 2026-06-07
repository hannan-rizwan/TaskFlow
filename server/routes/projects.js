const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ $or: [{ owner: req.user._id }, { "members.user": req.user._id }] }).populate("owner", "name email avatar").sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({ ...req.body, owner: req.user._id, members: [{ user: req.user._id, role: "admin" }] });
    await project.save();
    res.status(201).json(project);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("owner members.user", "name email avatar");
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { $set: req.body }, { new: true });
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (error) { res.status(500).json({ error: "Server error" }); }
});

module.exports = router;
