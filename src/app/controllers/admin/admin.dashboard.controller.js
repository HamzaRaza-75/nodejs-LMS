const { adminDashboard } = require('@services/dashboard.services');
const { success, error } = require('@utils');

const get = async (req, res, next) => {
  try {
    const data = await adminDashboard(req);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while getting adminDashboard', err.message);
    return error(res, err.status, 'Failed to get Dashboard', err.message);
  }
};

const view = async (req, res, next) => {
  try {
    const data = await adminDashboard.view(req.params.id);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while viewing adminDashboard', err.message);
    return error(res, 'Failed to view');
  }
};

const store = async (req, res, next) => {
  try {
    const data = await adminDashboard.create(req.body);
    return success(res, 201, 'adminDashboard created', data);
  } catch (err) {
    console.error('Error while creating adminDashboard', err.message);
    return error(res, 'Failed to create');
  }
};

const update = async (req, res, next) => {
  try {
    const data = await adminDashboard.update(req.params.id, req.body);
    return success(res, 200, 'adminDashboard updated', data);
  } catch (err) {
    console.error('Error while updating adminDashboard', err.message);
    return error(res, 'Failed to update');
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await adminDashboard.remove(req.params.id);
    return success(res, 200, 'adminDashboard deleted', data);
  } catch (err) {
    console.error('Error while deleting adminDashboard', err.message);
    return error(res, 'Failed to delete');
  }
};

module.exports = { get, view, store, update, remove };
