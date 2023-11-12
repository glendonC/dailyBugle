const mongoose = require('mongoose');

const adInteractionSchema = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advertisement',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['impression', 'click'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: { type: String },
  userAgent: { type: String }
});

module.exports = mongoose.model('AdInteraction', adInteractionSchema);
