const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  columns: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],
  background: { type: String, default: '#1a1a2e' },
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

boardSchema.index({ owner: 1 });
boardSchema.index({ members: 1 });

module.exports = mongoose.model('Board', boardSchema);
