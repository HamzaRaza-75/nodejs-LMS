const lectureService = require('@services/instructor/lecture.services');
const { success, error, NotFoundError, UnauthorizedError } = require('@utils');
const Course = require('@models/course.model');
const { canOperate } = require('@middlewares');

const checkOwnershipOrFail = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError(`Course doesn't exist`);
  }

  canOperate(course.instructor, userId);
  return course;
};

const get = async (req, res, next) => {
  try {
    const course = await checkOwnershipOrFail(
      req.params.courseId,
      req.user._id
    );
    if (!course) throw new UnauthorizedError('You are not the coures owner');
    const data = await lectureService.getLecturesByCourse(course._id);
    return success(res, 200, 'Lectures fetched successfully', data);
  } catch (err) {
    return error(res, err.statusCode, 'Failed to fetch lectures', err.message);
  }
};

const view = async (req, res, next) => {
  try {
    const data = await lectureService.view(req.params.id);
    return success(res, 200, 'Lecture fetched successfully', data);
  } catch (err) {
    return error(res, 500, 'Failed to fetch lecture', err.message);
  }
};

const store = async (req, res, next) => {
  try {
    const course = await checkOwnershipOrFail(
      req.params.courseId,
      req.user._id
    );
    if (!course) throw new UnauthorizedError('You are not the course owner');
    const data = await lectureService.createLecture({
      ...req.body,
      course: course._id,
    });
    return success(res, 201, 'Lecture created successfully', data);
  } catch (err) {
    return error(res, err.statusCode, 'Failed to create lecture', err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const lecture = await lectureService.view(req.params.id);
    if (!lecture) throw new NotFoundError('lecture Not Found');

    const course = await checkOwnershipOrFail(lecture.course, req.user._id);
    if (!course)
      throw new UnauthorizedError('you are not the owner of the course');

    const data = await lectureService.updateLecture(req.params.id, req.body);
    return success(res, 200, 'Lecture updated successfully', data);
  } catch (err) {
    return error(res, err.statusCode, 'Failed to update lecture', err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const lecture = await lectureService.view(req.params.id);
    if (!lecture) throw new NotFoundError('lecture Not Found');

    const course = await checkOwnershipOrFail(lecture.course, req.user._id);
    if (!course)
      throw new UnauthorizedError('You are not the owner of the course');

    const data = await lectureService.softDeleteLecture(req.params.id);
    return success(res, 200, 'Lecture deleted successfully', data);
  } catch (err) {
    return error(res, err.statusCode, 'Failed to delete lecture', err.message);
  }
};

module.exports = { get, view, store, update, remove };
