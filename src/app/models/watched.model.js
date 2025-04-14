import mongoose from 'mongoose';

const userWatchedSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
      required: true,
    },
    watchedAt: { type: Date, default: Date.now },
    progress: {
      type: Number,
      default: 0, // percentage (e.g., 50 means 50% watched)
      min: 0,
      max: 100,
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('UserWatched', userWatchedSchema);
