import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      firstname: String,
      lastname: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
