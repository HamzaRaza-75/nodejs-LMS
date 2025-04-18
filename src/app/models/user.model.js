const userMethods = require('@instancemethods/user.methods');
const mongoose = require('mongoose');

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userMethods(userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
