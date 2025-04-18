const authservice = require('@services/auth.services');
const { success, error } = require('@utils');

const login = async (req, res, next) => {
  try {
    const data = await authservice.login({
      email: req.body.email,
      password: req.body.password,
    });
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while getting authservice', err.message);
    error(res, 'Failed to fetch');
  }
};

const signup = async (req, res, next) => {
  try {
    const data = await authservice.getMultiple(req.query.page);
    success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while getting authservice', err.message);
    error(res, 'Failed to fetch');
  }
};

module.exports = { login, signup };
