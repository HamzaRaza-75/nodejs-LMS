const mongoose = require('mongoose');
const courseMethods = require('./staticinstancemethods/course.methods');

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isApproved: { type: Boolean, default: false },
    thumbnail: String,
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

courseMethods(courseSchema);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
