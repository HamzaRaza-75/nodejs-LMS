import mongoose from 'mongoose';

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

export default mongoose.model('Quiz', quizSchema);
