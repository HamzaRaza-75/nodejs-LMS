function userMethods(schema) {
  schema.statics.findByName = function (username) {
    return this.find({ name: username });
  };

  schema.statics.findByRoles = function (role) {
    return this.find({ role: role });
  };

  // virtuals
  schema
    .virtual('fullName')
    .get(function () {
      return this.name.firstname + ' ' + this.name.lastname;
    })
    .set(function (name) {
      const [first, ...rest] = name.trim().split(' ');
      this.name.first = first;
      this.name.last = rest.join(' ') || '';
    });
}

module.exports = userMethods;
