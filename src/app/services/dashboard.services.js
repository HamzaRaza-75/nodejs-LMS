const User = require('@models/user.model');
const Course = require('@models/course.model');

const { success, error, NotfoundError } = require('@utils');

const adminDashboard = async () => {
  try {
    const userCount = await User.aggregate([
      { $match: { isActive: true } },
      { $count: 'totalActiveUsers' },
    ]);

    const courseCount = await Course.aggregate([
      { $match: { isApproved: true } },
      { $count: 'totalCourses' },
    ]);

    const totalEnrolledStudents = await Enrollment.aggregate([
      { $match: { isApproved: true } },
      {
        $count: 'enrolledStudents',
      },
    ]);

    if (
      userCount.length === 0 &&
      courseCount.length === 0 &&
      totalEnrolledStudents.length === 0
    ) {
      throw new NotfoundError('Not Found');
    }

    const data = {
      userCount: userCount[0]?.totalActiveUsers || 0,
      courseCount: courseCount[0]?.totalCourses || 0,
      enrolledStudents: totalEnrolledStudents[0]?.totalEnrolledStudents || 0,
    };

    return data;
  } catch (err) {
    throw err;
  }
};

const instructorDashboard = async (id) => {
  try {
    const data = await ModelName.findById(id);
    if (!data) return error('Not Found', 404);
    return success('Fetched successfully', data);
  } catch (err) {
    throw err;
  }
};

const studentDashboard = async () => {
  try {
    const created = await ModelName.create(payload);
    return success('ModelName created', created);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  adminDashboard,
  instructorDashboard,
  studentDashboard,
};
