const mongoose = require('mongoose');

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

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
