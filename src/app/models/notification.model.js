const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: [
        'lecture',
        'quiz',
        'system',
        'comment',
        'enrollement',
        'newuser',
        'coursecomplete',
      ],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
