const mongoose = require('mongoose');
const lectureSchema = new mongoose.Schema(
  {
    title: String,
    videoUrl: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    uploadedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    duration: Number,
  },
  { timestamps: true }
);

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;
