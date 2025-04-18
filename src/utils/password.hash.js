const bcrypt = require('bcryptjs');

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (inputPassword, storedHash) => {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch;
};

module.exports = { generatePassword, verifyPassword };
