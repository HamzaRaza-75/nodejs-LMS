const { DATABASE_CONNECTION, checkstatus } = require('../../config');
const mongoose = require('mongoose');

async function dbConnection() {
  try {
    await mongoose.connect(DATABASE_CONNECTION, { autoIndex: checkstatus });
    console.log('connected successfully');
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnection;
