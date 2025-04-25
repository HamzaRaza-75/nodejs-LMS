const Lecture = require('@models/lecture.model');
const { NotFoundError } = require('../../../utils/customerror');

const getLecturesByCourse = async (courseId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const lectures = await Lecture.find({ course: courseId, deletedAt: null })
      .skip(skip)
      .limit(limit);

    const total = await Lecture.countDocuments({
      course: courseId,
      deletedAt: null,
    });

    return { data: lectures, meta: { total, page } };
  } catch (err) {
    throw err;
  }
};

const view = async (id) => {
  try {
    const lecture = await Lecture.findById(id);
    if (!lecture || lecture.deletedAt)
      throw new AppError('Unable to find this lecture');
    return lecture;
  } catch (err) {
    throw err;
  }
};

const createLecture = async (payload) => {
  try {
    const lecture = await Lecture.create(payload);
    return lecture;
  } catch (err) {
    throw err;
  }
};

const updateLecture = async (id, payload) => {
  try {
    const updated = await Lecture.findOneAndUpdate(
      { _id: id, deletedAt: null },
      payload,
      { new: true }
    );
    return updated;
  } catch (err) {
    throw err;
  }
};

const softDeleteLecture = async (id) => {
  try {
    const lecture = await Lecture.findOne({ _id: id });
    if (!lecture || lecture.deletedAt)
      throw new NotFoundError('Lecture Not Found');

    lecture.deletedAt = new Date();
    await lecture.save();

    return lecture;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getLecturesByCourse,
  view,
  createLecture,
  updateLecture,
  softDeleteLecture,
};
