const User = require('@models/user.model');
const Role = require('@models/role.model');
const {
  error,
  verifyToken,
  NotFoundError,
  UnauthorizedError,
} = require('@utils');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError('Unauthorized');

    const decoded = await verifyToken(token);
    const user = await User.findById(decoded._id);
    if (!user) throw new NotFoundError('User not found');

    req.user = user;
    next();
  } catch (err) {
    return error(res, 500, 'something went wrong', err.message);
  }
};

const roleCheck = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        throw new NotFoundError('Current User Not Found');
      }

      const userRole = await Role.findById(user.role);

      if (!allowedRoles.includes(userRole.name)) {
        throw new UnauthorizedError('You are unAuthorized to hit admin routes');
      }

      next();
    } catch (err) {
      return error(
        res,
        err.statusCode,
        'An error occurred while checking roles.',
        err.message
      );
    }
  };
};

module.exports = { roleCheck, authMiddleware };
