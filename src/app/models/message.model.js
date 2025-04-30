const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Only for private (user-to-user) chat
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroupChat',
      default: null,
    },

    content: { type: String, required: true },
  },
  { timestamps: true }
);

messageSchema.index({ receiver: 1, groupId: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);
