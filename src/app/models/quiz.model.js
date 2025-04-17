const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
