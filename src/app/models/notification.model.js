const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: {
      type: Object,
      required: true,
    },
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
        'newcourse',
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
