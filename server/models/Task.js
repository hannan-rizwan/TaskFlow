const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  column: { type: String, required: true, default: "todo" },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  labels: [String],
  dueDate: Date,
  order: { type: Number, default: 0 },
  subtasks: [{ title: String, completed: { type: Boolean, default: false } }],
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

taskSchema.index({ project: 1, column: 1, order: 1 });
module.exports = mongoose.model("Task", taskSchema);
