import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    thumbnail: String,
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
