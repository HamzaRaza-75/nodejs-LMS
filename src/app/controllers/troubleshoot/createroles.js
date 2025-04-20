const role = require('@services/role.services');
const { success, error } = require('@utils');

const storeRoles = async (req, res, next) => {
  try {
    const data = await role.createRoles();
    return success(res, 200, 'Roles Created Successfully', data);
  } catch (err) {
    console.error('Error while getting role', err.message);
    return error(res, err.statusCode, 'Failed to fetch', err.message);
  }
};

module.exports = { storeRoles };
