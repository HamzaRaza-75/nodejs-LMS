const User = require('@models/user.model');
const { createToken, AppError, NotFoundError } = require('@utils');
const bcrypt = require('bcryptjs');
const Role = require('../models/role.model');

const signupUser = async (data) => {
  const roleId = await Role.findOne({ name: 'student' });
  if (!roleId) {
    throw new NotFoundError('Role Not found');
  }
  const newUser = new User({
    name: { firstname: data.name.firstname, lastname: data.name.lastname },
    email: data.email,
    password: data.password,
    role: roleId.id,
  });
  await newUser.save();

  if (!newUser) {
    throw new AppError(500, 'User is not saved');
  }

  const payload = newUser.toObject();
  delete payload.__v;
  delete payload.password;
  delete payload.createdAt;
  delete payload.updatedAt;

  const jwt = await createToken(payload);

  return { jwt };
};

const loginUser = async (data) => {
  const foundUser = await User.findOne({ email: data.email });
  if (!foundUser) {
    throw new Error('User Not found');
  }

  const isMatch = await bcrypt.compare(data.password, foundUser.password);

  if (!isMatch) {
    throw new Error('Credidentials do not match');
  }

  const payload = foundUser.toObject();
  delete payload.password;
  delete payload.__v;
  delete payload.updatedAt;
  delete payload.createdAt;

  const jwt = await createToken(payload);

  return {
    token: jwt,
  };
};

module.exports = {
  signupUser,
  loginUser,
};
