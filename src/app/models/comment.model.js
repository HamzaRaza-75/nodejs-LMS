import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
