const mongoose = require('mongoose');
const roleMethods = require('./staticinstancemethods/role.methods');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roleMethods(roleSchema);

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
