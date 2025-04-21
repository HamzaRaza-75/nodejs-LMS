function roleMethods(schema) {
  schema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'role',
  });
}

module.exports = roleMethods;
