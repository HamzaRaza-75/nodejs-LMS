import { DATABASE_CONNECTION } from '../../config/index.js';
import mongoose from 'mongoose';

async function dbConnection() {
  try {
    await mongoose.connect(DATABASE_CONNECTION);
    console.log('connected successfully');
  } catch (error) {
    console.log(error);
  }
}

export { dbConnection };
