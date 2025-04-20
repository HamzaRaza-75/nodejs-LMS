const User = require('@models/user.model');
const Role = require('@models/role.model');
const { error, verifyToken, error } = require('@utils');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');

    const decoded = await verifyToken(token);
    const user = await User.findById(decoded._id);
    if (!user) throw new Error('User not found');

    req.user = user;
    next();
  } catch (err) {
    return error(res, 500, 'something went wrong', err);
  }
};

const roleCheck = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return error(
          res,
          403,
          'Access Denied. No user data found.',
          'You are not authenticated User'
        );
      }

      const userRole = await Role.findById(user.role);

      if (!allowedRoles.includes(userRole)) {
        return error(
          res,
          403,
          'Access Denied. You do not have the required role.'
        );
      }

      next();
    } catch (err) {
      return error(
        res,
        500,
        'An error occurred while checking roles.',
        'Something went wrong'
      );
    }
  };
};

module.exports = { roleCheck, authMiddleware };
