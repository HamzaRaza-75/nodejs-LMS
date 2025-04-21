const serviceName = require('@services/serviceName');
const { success, error } = require('@utils');

const get = async (req, res, next) => {
  try {
    const data = await serviceName.getMultiple(req.query.page);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while getting serviceName', err.message);
    return error(res, 'Failed to fetch');
  }
};

const view = async (req, res, next) => {
  try {
    const data = await serviceName.view(req.params.id);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    console.error('Error while viewing serviceName', err.message);
    return error(res, 'Failed to view');
  }
};

const store = async (req, res, next) => {
  try {
    const data = await serviceName.create(req.body);
    return success(res, 201, 'serviceName created', data);
  } catch (err) {
    console.error('Error while creating serviceName', err.message);
    return error(res, err.statusCode, 'Failed to create', err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await serviceName.update(req.params.id, req.body);
    return success(res, 200, 'serviceName updated', data);
  } catch (err) {
    console.error('Error while updating serviceName', err.message);
    return error(res, 'Failed to update');
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await serviceName.remove(req.params.id);
    return success(res, 200, 'serviceName deleted', data);
  } catch (err) {
    console.error('Error while deleting serviceName', err.message);
    return error(res, 'Failed to delete');
  }
};

module.exports = { get, view, store, update, remove };
