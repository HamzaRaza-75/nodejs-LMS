const dashboard = require('@services/dashboard.services');
const { success, error, NotfoundError } = require('@utils');

const get = async (req, res, next) => {
  try {
    const data = await dashboard.instructorDashboard(req);
    if (!data)
      throw new NotfoundError(
        'Oops! Something went wrong while retrieving your dashboard analytics'
      );
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    return error(res, 'Failed to fetch');
  }
};

const view = async (req, res, next) => {
  try {
    const data = await dashboard.view(req.params.id);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while viewing dashboard', err.message);
    return error(res, 'Failed to view');
  }
};

const store = async (req, res, next) => {
  try {
    const data = await dashboard.create(req.body);
    return success(res, 201, 'dashboard created', data);
  } catch (err) {
    console.error('Error while creating dashboard', err.message);
    return error(res, 'Failed to create');
  }
};

const update = async (req, res, next) => {
  try {
    const data = await dashboard.update(req.params.id, req.body);
    return success(res, 200, 'dashboard updated', data);
  } catch (err) {
    console.error('Error while updating dashboard', err.message);
    return error(res, 'Failed to update');
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await dashboard.remove(req.params.id);
    return success(res, 200, 'dashboard deleted', data);
  } catch (err) {
    console.error('Error while deleting dashboard', err.message);
    return error(res, 'Failed to delete');
  }
};

module.exports = { get, view, store, update, remove };
