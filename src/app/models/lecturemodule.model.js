const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    order: Number,
  },
  { timestamps: true }
);

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;
