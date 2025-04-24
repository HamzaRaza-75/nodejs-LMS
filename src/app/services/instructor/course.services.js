const Course = require('@models/course.model');
const Lecture = require('@models/lecture.model');
const Enrollment = require('@models/enrollment.model');
const Review = require('@models/review.model');
const Notification = require('@models/notification.model');
const { success, error } = require('@utils');
const { canOperate } = require('@middlewares');

const getMyCourses = async (req, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const data = await Course.aggregate([
      { $match: { instructor: new mongoose.Types.ObjectId(req.user._id) } },

      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'course',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewsCount: { $size: '$reviews' },
        },
      },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course',
          as: 'enrollments',
        },
      },
      {
        $addFields: {
          enrolledCount: { $size: '$enrollments' },
        },
      },

      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await Course.countDocuments({ instructor: req.user._id });

    return {
      data,
      meta: { total, page },
    };
  } catch (err) {
    throw err;
  }
};

const viewMyCourse = async (userId, courseid) => {
  try {
    const data = await Course.findById(id);
    if (!data) return error('Not Found', 404);

    canOperate(data.instructor, userId);

    const [lectureCount, enrolledStudents, courseReviews] = await Promise.all([
      Lecture.countDocuments({ course: id }),
      Enrollment.countDocuments({ course: id, isApproved: true }),
      Review.find({ course: id }).lean(),
    ]);

    return success('Fetched successfully', {
      course: data,
      lectureCount,
      enrolledStudents,
      reviews: courseReviews,
    });
  } catch (err) {
    throw err;
  }
};

const createNewCourse = async (req) => {
  try {
    const { title, description, ...rest } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      instructor: req.user._id,
      ...rest,
    });

    const adminUsers = await User.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'roleData',
        },
      },
      { $unwind: '$roleData' },
      {
        $match: {
          'roleData.name': 'admin',
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    if (adminUsers) {
      const notifications = adminUsers.map((admin) => ({
        recipient: admin._id,
        type: 'newcourse',
        data: {
          message: `Instructor with ID ${instructorId} requested a new course approval.`,
          instructorId,
          courseId: newCourse._id,
        },
      }));

      await Notification.insertMany(notifications);
    }

    return newCourse;
  } catch (error) {
    throw error;
  }
};

const updateMyCourse = async (req, id) => {
  try {
    const course = await Course.findById(id);
    if (!course) return error('Course not found', 404);

    canOperate(course.instructor, req.user.id);

    const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });
    return success('Updated successfully', updated);
  } catch (err) {
    throw err;
  }
};

const deleteMyCourse = async (id, userId) => {
  try {
    const course = await Course.findOne({ _id: id });
    if (!course) throw new Error('Course not found');

    canOperate(course.instructor, userId);

    const enrolledCount = await Enrollment.countDocuments({ course: id });
    if (enrolledCount > 0) {
      throw new Error('Cannot delete course with enrolled students');
    }

    // Soft delete
    course.deletedAt = new Date();
    await course.save();

    return { message: 'Course has been deleted successfully' };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getMyCourses,
  viewMyCourse,
  createNewCourse,
  updateMyCourse,
  deleteMyCourse,
};
