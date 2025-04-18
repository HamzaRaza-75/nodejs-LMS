const authservice = require('@services/auth.services');
const { success, error } = require('@utils');

const login = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await authservice.loginUser({
      email: data.email,
      password: data.password,
    });

    return success(res, 200, 'Fetched successfully', user);
  } catch (err) {
    console.log(err);
    return error(res, 404, 'Failed to fetch', err.message);
  }
};

const signup = async (req, res, next) => {
  try {
    const data = await authservice.signupUser(req.body);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    return error(res, 400, 'Failed to save', err.message);
  }
};

module.exports = { login, signup };
