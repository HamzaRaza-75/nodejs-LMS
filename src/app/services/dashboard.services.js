const User = require('@models/user.model');
const Course = require('@models/course.model');
const Enrollment = require('@models/enrollment.model');
const Notification = require('@models/notification.model');

const { success, error, NotfoundError } = require('@utils');

const adminDashboard = async (req) => {
  try {
    const userCount = await User.countDocuments({ isActive: true });

    const courseCount = await Course.countDocuments({ isApproved: true });

    const [totalEnrolledStudents] = await Enrollment.aggregate([
      { $match: { isApproved: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'students',
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        $facet: {
          monthlyCounts: [
            {
              $group: {
                _id: { $month: '$createdAt' },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
          total: [{ $count: 'totalCount' }],
        },
      },
    ]);

    const [notificationsData] = await Notification.aggregate([
      { $match: { read: false, recipient: req.user._id } },
      {
        $facet: {
          totalCount: [{ $count: 'unreadNotifications' }],
          notifications: [{ $skip: 0 }, { $limit: 15 }],
        },
      },
    ]);

    if (!userCount && !courseCount && !totalEnrolledStudents) {
      throw new NotfoundError('Data not found');
    }

    const data = {
      userCount: userCount || 0,
      courseCount: courseCount || 0,
      enrolledStudents: totalEnrolledStudents?.[1]?.total || 0, // Note: Total count should be from facet
      notifications: notificationsData?.[1] || [],
      notificationCount: notificationsData?.[0]?.unreadNotifications || 0,
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
