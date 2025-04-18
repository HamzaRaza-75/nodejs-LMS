const { generatePassword } = require('@utils');

function userMethods(schema) {
  schema.statics.findByName = function (username) {
    return this.find({ name: username });
  };

  schema.statics.findByRoles = function (role_id) {
    return this.find({ role: role_id });
  };

  schema
    .virtual('fullName')
    .get(function () {
      return this.name.firstname + ' ' + this.name.lastname;
    })
    .set(function (name) {
      const [first, ...rest] = name.trim().split(' ');
      this.name.firstname = first;
      this.name.lastname = rest.join(' ') || '';
    });

  schema.pre('save', async function () {
    if (this.isModified('password')) {
      this.password = await generatePassword(this.password);
    }
  });
}

module.exports = userMethods;
