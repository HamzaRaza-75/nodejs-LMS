const User = require('@models/user.model');
const { createToken } = require('@utils');
const bcrypt = require('bcryptjs');
const Role = require('../models/role.model');

const signupUser = async (data) => {
  const roleId = await Role.findOne({ name: 'student' });
  const newUser = new User({
    name: { firstname: data.name.firstname, lastname: data.name.lastname },
    email: data.email,
    password: data.password,
    role: roleId.id,
  });
  await newUser.save();

  if (!newUser) {
    throw new Error();
  }

  const payload = newUser.toObject();
  delete payload.__v;
  delete payload.password;
  delete payload._id;
  delete payload.createdAt;
  delete payload.updatedAt;

  const jwt = await createToken(payload);

  return { data: payload };
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
  delete payload._id;
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
