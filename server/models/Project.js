const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, role: { type: String, enum: ["admin", "editor", "viewer"], default: "editor" } }],
  columns: [{ id: String, title: String, order: Number }],
  color: { type: String, default: "#3B82F6" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  if (this.isNew && this.columns.length === 0) {
    this.columns = [
      { id: "todo", title: "To Do", order: 0 },
      { id: "in-progress", title: "In Progress", order: 1 },
      { id: "review", title: "In Review", order: 2 },
      { id: "done", title: "Done", order: 3 }
    ];
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);
