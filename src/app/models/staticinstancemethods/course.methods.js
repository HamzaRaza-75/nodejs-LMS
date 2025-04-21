function courseMethods(schema) {
  schema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'course_id',
  });
}

module.exports = courseMethods;
