export default function userMethods(schema) {
  schema.statics.findByName = function (username) {
    return this.find({ name: username });
  };

  schema.statics.findByRoles = function (role) {
    return this.find({ role: role });
  };
}
