import mongoose from 'mongoose';
import userMethods from './staticinstancemethods/user.methods';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      firstname: {
        required: true,
        type: String,
        min: 6,
        max: 20,
      },
      lastname: {
        required: true,
        type: String,
        min: 6,
        max: 20,
      },
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

userMethods(userSchema);

export default mongoose.model('User', userSchema);
