const course = require('@models/course.model');
const { success, error } = require('@utils');

const getMultiple = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const data = await course.find().skip(skip).limit(limit);
    const total = await course.countDocuments();
    return success('Fetched successfully', { data, meta: { total, page } });
  } catch (err) {
    throw err;
  }
};

const view = async (id) => {
  try {
    const data = await course.findById(id);
    if (!data) return error('Not Found', 404);
    return success('Fetched successfully', data);
  } catch (err) {
    throw err;
  }
};

const create = async (payload) => {
  try {
    const created = await course.create(payload);
    return success('course created', created);
  } catch (err) {
    throw err;
  }
};

const update = async (id, payload) => {
  try {
    const updated = await course.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return error('Not Found', 404);
    return success('Updated successfully', updated);
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    const deleted = await course.findByIdAndDelete(id);
    if (!deleted) return error('Not Found', 404);
    return success('Deleted successfully');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getMultiple,
  view,
  create,
  update,
  remove,
};
