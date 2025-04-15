import { DATABASE_CONNECTION, checkstatus } from '../../config/index.js';
import mongoose from 'mongoose';

async function dbConnection() {
  try {
    await mongoose.connect(DATABASE_CONNECTION, { autoIndex: checkstatus });
    console.log('connected successfully');
  } catch (error) {
    console.log(error);
  }
}

export { dbConnection };
