const dashboard = require('@services/dashboard.services');
const { success, error, NotFoundError } = require('@utils');

const get = async (req, res, next) => {
  try {
    const data = await dashboard.studentDashboard(req);
    if (!data)
      throw new NotFoundError('Opsss! Error occour while fetch your routes');

    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    return error(res, err.statusCode, 'Failed to fetch', err.message);
  }
};

module.exports = { get };
