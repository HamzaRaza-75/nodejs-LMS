const Role = require('@models/role.model');
const { roles: roleNames } = require('@config');

const createRoles = async () => {
  try {
    const names = Object.values(roleNames);

    for (const roleName of names) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        await Role.create({ name: roleName });
        console.log(`✅ Created role: ${roleName}`);
      } else {
        console.log(`⚠️ Role already exists: ${roleName}`);
      }
    }

    console.log('🎉 Role creation complete.');
    return 'roles created successfully';
  } catch (err) {
    console.error('❌ Error creating roles:', err.message);
  }
};

module.exports = { createRoles };
