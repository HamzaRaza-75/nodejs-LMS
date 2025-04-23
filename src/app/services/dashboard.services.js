const User = require('@models/user.model');
const Course = require('@models/course.model');
const Enrollment = require('@models/enrollment.model');
const Notification = require('@models/notification.model');
const UserWatched = require('@models/watched.model');

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

const instructorDashboard = async (req) => {
  try {
    const dashboardData = await Course.aggregate([
      {
        $match: {
          instructor: req.user._id,
          status: 'approved',
        },
      },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course',
          pipeline: [
            { $match: { isApproved: true } },
            { $count: 'approvedEnrollments' },
          ],
          as: 'approvedEnrollments',
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'course',
          pipeline: [{ $count: 'reviewCount' }],
          as: 'reviewStats',
        },
      },
      {
        $addFields: {
          approvedEnrollmentCount: {
            $arrayElemAt: ['$approvedEnrollments.approvedEnrollments', 0],
          },
          reviewCount: {
            $arrayElemAt: ['$reviewStats.reviewCount', 0],
          },
        },
      },
      {
        $sort: { reviewCount: -1 }, // Sort to get top courses by review
      },
      {
        $limit: 5, // Top 5 courses
      },
      {
        $project: {
          title: 1,
          approvedEnrollmentCount: 1,
          reviewCount: 1,
          rating: 1,
        },
      },
    ]);

    const notificationData = await Notification.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $facet: {
          unreadCount: [{ $match: { read: false } }, { $count: 'count' }],
          latestNotifications: [{ $sort: { createdAt: -1 } }, { $limit: 5 }],
        },
      },
    ]);

    return {
      courses: dashboardData,
      unreadNotificationCount:
        notificationData[0]?.unreadCount?.[0]?.count || 0,
      notifications: notificationData[0]?.latestNotifications || [],
    };
  } catch (err) {
    throw err;
  }
};

const studentDashboard = async (req) => {
  try {
    const studentId = req.user._id;
    const completedCourses = await Enrollment.aggregate([
      {
        $match: {
          student: studentId,
          status: 'completed',
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
      { $unwind: '$course' },
      { $sort: { completedAt: -1 } },
      {
        $facet: {
          recentCompleted: [
            { $limit: 5 },
            {
              $project: {
                title: '$course.title',
                image: '$course.image',
                completedAt: 1,
              },
            },
          ],
          lastCompleted: [
            { $limit: 1 },
            {
              $lookup: {
                from: 'lectures',
                localField: '$course._id',
                foreignField: 'course',
                as: 'lectures',
              },
            },
            {
              $project: {
                title: '$course.title',
                image: '$course.image',
                lectures: {
                  $map: {
                    input: '$lectures',
                    as: 'lecture',
                    in: {
                      title: '$$lecture.title',
                      image: '$$lecture.image',
                    },
                  },
                },
              },
            },
          ],
          completedCount: [{ $count: 'totalCompleted' }],
        },
      },
    ]);

    const lecturesThisMonth = await UserWatched.aggregate([
      {
        $match: {
          student: studentId,
          watchedAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      { $count: 'thisMonthLectures' },
    ]);

    const notifications = await Notification.aggregate([
      {
        $match: {
          recipient: studentId,
          read: false,
        },
      },
      {
        $facet: {
          unreadCount: [{ $count: 'count' }],
        },
      },
    ]);

    return {
      recentlyCompletedCourses: completedCourses[0].recentCompleted,
      lastCompletedCourse: completedCourses[0].lastCompleted[0] || null,
      completedCourseCount:
        completedCourses[0].completedCount[0]?.totalCompleted || 0,
      lecturesWatchedThisMonth: lecturesThisMonth[0]?.thisMonthLectures || 0,
      unreadNotificationCount: notifications[0].unreadCount[0]?.count || 0,
      notifications: notifications[0].recentUnread || [],
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  adminDashboard,
  instructorDashboard,
  studentDashboard,
};
