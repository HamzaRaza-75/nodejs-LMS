import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    order: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Module', moduleSchema);
