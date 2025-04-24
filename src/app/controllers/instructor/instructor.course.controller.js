const course = require('@services/instructor/course.services');
const { success, error } = require('@utils');

const get = async (req, res) => {
  try {
    const data = await course.getMyCourses(req, req.query.page);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    return error(res, res.statusCode, 'Failed to fetch', err.message);
  }
};

const view = async (req, res) => {
  try {
    const data = await course.viewMyCourse(req.user._id, req.params.id);
    return success(res, 200, 'Fetched successfully', data);
  } catch (err) {
    return error(res, res.statusCode, 'Failed to fetch', err.message);
  }
};

const store = async (req, res) => {
  try {
    const data = await course.createNewCourse(req);
    return success(res, 201, 'course created', data);
  } catch (err) {
    return error(res, res.statusCode, 'Failed to fetch', err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await course.update(req.params.id, req.body);
    return success(res, 200, 'course updated', data);
  } catch (err) {
    return error(res, res.statusCode, 'Failed to fetch', err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await course.deleteMyCourse(req.params.id, req.user._id);
    return success(res, 200, 'course deleted', data);
  } catch (err) {
    return error(res, res.statusCode, 'Failed to fetch', err.message);
  }
};

module.exports = { get, view, store, update, remove };
